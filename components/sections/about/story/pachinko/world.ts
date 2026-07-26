// matter-js setup for the bins: static floor, walls and dividers, plus the
// helpers for creating, stepping and constraining ball bodies.
import {
  DIVIDERS,
  FENCE_CATEGORY,
  FENCE_TOP,
  FLOOR,
  GRAVITY,
  H,
  PAD,
  R,
  W
} from "@/components/sections/about/story/pachinko/board";
import Matter from "matter-js";

// Per-ball state carried on the physics body.
export type BallMeta = {
  counted: boolean;
  bin: number;
  bornAt: number;
  impactAt: number;
  trail: { x: number; y: number }[];
};

export const metaOf = (body: Matter.Body) => body.plugin as BallMeta;

export function createWorld() {
  const engine = Matter.Engine.create({ enableSleeping: true });
  // Matter gravity is px/ms² per unit, so /1000 matches GRAVITY in px/s².
  engine.gravity.y = GRAVITY / 1000;
  // Above the defaults (6/4): dense piles push resting balls through the
  // statics otherwise.
  engine.positionIterations = 10;
  engine.velocityIterations = 8;

  // Thicker than the drawn geometry to prevent tunnelling.
  const statics = [
    Matter.Bodies.rectangle(W / 2, FLOOR + 20, W + 120, 40, { isStatic: true }),
    Matter.Bodies.rectangle(PAD - 20, H / 2, 40, H * 2, { isStatic: true }),
    Matter.Bodies.rectangle(W - PAD + 20, H / 2, 40, H * 2, { isStatic: true }),
    // Dividers extend well above the drawn posts. Falling balls filter them
    // out (see createBall) so they do not affect where a ball lands; the mask
    // is switched on at first contact, after which balls cannot cross.
    ...DIVIDERS.map(xd =>
      Matter.Bodies.rectangle(
        xd,
        (FENCE_TOP + FLOOR) / 2 + 4,
        8,
        FLOOR - FENCE_TOP + 8,
        {
          isStatic: true,
          chamfer: { radius: 3 },
          collisionFilter: { category: FENCE_CATEGORY, mask: 0xffffffff }
        }
      )
    )
  ];
  for (const body of statics) {
    body.friction = 0.3;
    body.restitution = 0.2;
  }
  Matter.Composite.add(engine.world, statics);

  // Record impacts for the squash effect, and enable divider collisions once
  // a ball has touched anything.
  Matter.Events.on(engine, "collisionStart", event => {
    const now = performance.now();
    for (const pair of event.pairs) {
      for (const body of [pair.bodyA, pair.bodyB]) {
        if (body.label !== "ball") continue;
        body.collisionFilter.mask = 0xffffffff;
        if (Math.hypot(body.velocity.x, body.velocity.y) > 2.5) {
          metaOf(body).impactAt = now;
        }
      }
    }
  });

  return engine;
}

// Create a ball body at the point where its peg-field flight ended.
export function createBall(
  x: number,
  y: number,
  velocity: { vx: number; vy: number },
  meta: Omit<BallMeta, "impactAt" | "counted" | "bin">
) {
  const body = Matter.Bodies.circle(x, y, R, {
    label: "ball",
    restitution: 0.35,
    friction: 0.08,
    frictionAir: 0.012,
    sleepThreshold: 35,
    // Ignore the dividers while falling so landings depend only on momentum.
    collisionFilter: { category: 0x0001, mask: ~FENCE_CATEGORY }
  });
  body.plugin = {
    ...meta,
    counted: false,
    bin: -1,
    impactAt: -1
  } satisfies BallMeta;
  // Matter velocity is px per 60fps step, hence /60.
  Matter.Body.setVelocity(body, { x: velocity.vx / 60, y: velocity.vy / 60 });
  return body;
}

// Two half-steps per frame: the smaller timestep prevents heavy piles from
// penetrating the statics.
export function stepWorld(engine: Matter.Engine, dt: number) {
  const delta = Math.min(dt, 1 / 60) * 500;
  Matter.Engine.update(engine, delta);
  Matter.Engine.update(engine, delta);
}

export function addBody(engine: Matter.Engine, body: Matter.Body) {
  Matter.Composite.add(engine.world, body);
}

export function removeBody(engine: Matter.Engine | null, body: Matter.Body) {
  if (engine) Matter.Composite.remove(engine.world, body);
}

// Push a ball that has penetrated the floor or a wall back inside the bounds.
export function containBall(body: Matter.Body) {
  let x = body.position.x;
  let y = body.position.y;
  let moved = false;
  if (y > FLOOR - R + 3) {
    y = FLOOR - R;
    moved = true;
  }
  if (x < PAD + R - 3) {
    x = PAD + R;
    moved = true;
  } else if (x > W - PAD - R + 3) {
    x = W - PAD - R;
    moved = true;
  }
  if (!moved) return;
  if (body.isSleeping) Matter.Sleeping.set(body, false);
  Matter.Body.setPosition(body, { x, y });
  Matter.Body.setVelocity(body, { x: 0, y: 0 });
}

export const sleep = (body: Matter.Body) => Matter.Sleeping.set(body, true);

export const speedOf = (body: Matter.Body) =>
  Math.hypot(body.velocity.x, body.velocity.y) * 60;

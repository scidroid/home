"use client";

import { useTransitionRouter } from "next-view-transitions";

import { AnchorHTMLAttributes, MouseEvent } from "react";

function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translate(0, 0)"
      },
      {
        opacity: 0,
        transform: "translate(-100px, 0)"
      }
    ],
    {
      duration: 400,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    }
  );

  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translate(100px, 0)"
      },
      {
        opacity: 1,
        transform: "translate(0, 0)"
      }
    ],
    {
      duration: 400,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    }
  );
}

export function Link({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useTransitionRouter();

  function action(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    const target = href as string;
    const isHashLink = target.startsWith("#") || target.includes("/#");

    router.push(target, {
      onTransitionReady: () => {
        slideInOut();
        if (!isHashLink) {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  return (
    <a href={href} onClick={action} {...props}>
      {children}
    </a>
  );
}

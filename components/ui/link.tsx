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

    router.push(href as string, {
      onTransitionReady: slideInOut
    });
  }

  return (
    <a href={href} onClick={action} {...props}>
      {children}
    </a>
  );
}

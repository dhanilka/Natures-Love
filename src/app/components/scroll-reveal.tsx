"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const timeout = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(timeout);
    }

    const node = revealRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hideTimeoutRef.current) {
          window.clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }

        if (entry.isIntersecting) {
          setIsVisible(true);
          return;
        }

        hideTimeoutRef.current = window.setTimeout(() => {
          setIsVisible(false);
          hideTimeoutRef.current = null;
        }, 220);
      },
      {
        rootMargin: "-10% 0px -22% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(node);

    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }

      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`${className} scroll-reveal${isVisible ? " scroll-reveal--visible" : ""}`}
      ref={revealRef}
    >
      {children}
    </div>
  );
}

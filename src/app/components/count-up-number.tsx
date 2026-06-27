"use client";

import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  className?: string;
  duration?: number;
  end: number;
  suffix?: string;
};

export function CountUpNumber({
  className,
  duration = 1400,
  end,
  suffix = "",
}: CountUpNumberProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const timeout = window.setTimeout(() => {
        setIsVisible(true);
        setValue(end);
      }, 0);

      return () => window.clearTimeout(timeout);
    }

    const node = numberRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValue(0);
          setIsVisible(true);
          return;
        }

        setIsVisible(false);
        setValue(0);
      },
      {
        rootMargin: "-8% 0px -18% 0px",
        threshold: 0.35,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(animate);
      }
    };

    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, end, isVisible]);

  return (
    <strong className={className} ref={numberRef}>
      {value.toLocaleString()}
      {suffix}
    </strong>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type Product = {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  themeColor: string;
  accentColor: string;
  ingredientLabel: string;
};

const products: Product[] = [
  {
    name: "Dried Mango Strips",
    subtitle: "Sun-dried tropical sweetness",
    description:
      "Golden mango slices with a bright chewy bite, made for lunch boxes, gifting, and slow afternoon snacking.",
    image: "/products/dried-mango-strips.png",
    themeColor: "#ee9417",
    accentColor: "#ffe48b",
    ingredientLabel: "Mango",
  },
  {
    name: "Dried Blueberries",
    subtitle: "Deep berry energy",
    description:
      "Naturally rich blueberries with a bold color story and a clean, fruit-forward pouch presence.",
    image: "/products/dried-blueberries.png",
    themeColor: "#123d66",
    accentColor: "#9ed3ff",
    ingredientLabel: "Blueberry",
  },
  {
    name: "Dried Cranberries",
    subtitle: "Tart, vivid, snack-ready",
    description:
      "A cranberry-red hero pack with a tangy fruit profile and a polished shelf-ready look.",
    image: "/products/dried-cranberries.png",
    themeColor: "#a7132e",
    accentColor: "#ffc3ca",
    ingredientLabel: "Cranberry",
  },
  {
    name: "Green Pumpkin Seeds",
    subtitle: "Earthy seed crunch",
    description:
      "Forest-green packaging for nutrient-rich pumpkin seeds with a grounded natural finish.",
    image: "/products/green-pumpkin-seeds.png",
    themeColor: "#075633",
    accentColor: "#b7d66c",
    ingredientLabel: "Pumpkin seed",
  },
];

const orbitSlots = [
  {
    transform: "translate3d(-50%, -50%, 0) scale(1) rotate(0deg)",
    opacity: 1,
    zIndex: 40,
  },
  {
    transform: "translate3d(34%, -46%, 0) scale(.6) rotate(8deg)",
    opacity: 0.82,
    zIndex: 30,
  },
  {
    transform: "translate3d(-50%, -78%, 0) scale(.42) rotate(-2deg)",
    opacity: 0.42,
    zIndex: 20,
  },
  {
    transform: "translate3d(-134%, -46%, 0) scale(.6) rotate(-8deg)",
    opacity: 0.82,
    zIndex: 30,
  },
];

const rotationMs = 4000;

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function readableInk(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.57 ? "#1f281e" : "#fff9ed";
}

function productPosition(index: number, activeIndex: number) {
  const slot = (index - activeIndex + products.length) % products.length;

  return orbitSlots[slot];
}

export function ProductHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeProduct = products[activeIndex];
  const ink = readableInk(activeProduct.themeColor);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, rotationMs);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const heroStyle = useMemo(
    () =>
      ({
        "--hero-theme": activeProduct.themeColor,
        "--hero-accent": activeProduct.accentColor,
        "--hero-ink": ink,
        "--hero-panel": ink === "#1f281e" ? "rgba(255, 251, 238, .62)" : "rgba(255, 251, 238, .14)",
      }) as CSSProperties,
    [activeProduct, ink],
  );

  const nextProduct = () => {
    setActiveIndex((current) => (current + 1) % products.length);
  };

  const previousProduct = () => {
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  };

  return (
    <main
      className="min-h-screen overflow-hidden text-[var(--hero-ink)] transition-colors duration-700"
      style={heroStyle}
    >
      <section className="relative flex min-h-screen flex-col bg-[radial-gradient(circle_at_78%_16%,var(--hero-accent)_0,transparent_28%),radial-gradient(circle_at_14%_76%,rgba(255,255,255,.36)_0,transparent_26%),linear-gradient(135deg,var(--hero-theme)_0%,color-mix(in_srgb,var(--hero-theme)_78%,#25150a)_100%)] px-5 py-5 sm:px-8 lg:px-12">
        <div className="hero-grain" />
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <a className="text-base font-black tracking-[0.2em] sm:text-lg" href="#">
            NATURESLOVE
          </a>
          <nav className="hidden items-center gap-3 text-xs font-bold md:flex">
            {["Products", "Ingredients", "About"].map((item) => (
              <a
                className="rounded-full border border-current/25 bg-[var(--hero-panel)] px-4 py-2 backdrop-blur-md transition hover:bg-white/25"
                href={`#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            className="rounded-full border border-current/30 bg-[var(--hero-panel)] px-4 py-2 text-xs font-black backdrop-blur-md transition hover:bg-white/25"
            href="mailto:hello@natureslove.example"
          >
            Contact
          </a>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-5 py-5 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:py-4">
          <div className="order-3 max-w-xl lg:order-1">
            <div className="mb-5 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-[0.18em]">
              {["Dried fruit", "Seeds", "Natural snacks"].map((chip) => (
                <span
                  className="rounded-full border border-current/25 bg-[var(--hero-panel)] px-3 py-2 backdrop-blur"
                  key={chip}
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="text-sm font-black uppercase tracking-[0.34em] opacity-80">
              Product showcase
            </p>
            <h1 className="mt-4 text-5xl font-black leading-[0.9] sm:text-7xl lg:text-8xl">
              NaturesLove
            </h1>
            <div className="mt-7 min-h-48 rounded-[2rem] border border-current/20 bg-[var(--hero-panel)] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
              <p className="text-sm font-black uppercase tracking-[0.24em] opacity-70">
                {activeProduct.subtitle}
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                {activeProduct.name}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 opacity-85">
                {activeProduct.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--hero-ink)] px-6 text-sm font-black text-[var(--hero-theme)] transition hover:scale-[1.02]"
                  href="#products"
                >
                  Explore collection
                </a>
                <button
                  className="inline-flex h-12 items-center justify-center rounded-full border border-current/30 bg-transparent px-6 text-sm font-black transition hover:bg-white/15"
                  onClick={nextProduct}
                  type="button"
                >
                  Rotate product
                </button>
              </div>
            </div>
          </div>

          <div className="relative order-1 min-h-[390px] sm:min-h-[520px] lg:order-2 lg:min-h-[680px]">
            <p className="pointer-events-none absolute left-1/2 top-10 z-0 -translate-x-1/2 whitespace-nowrap text-center text-6xl font-black uppercase leading-none tracking-normal text-white/20 sm:text-8xl lg:text-[9rem]">
              Snacks
            </p>
            <div className="product-stage absolute left-1/2 top-1/2 z-10 h-[min(82vw,660px)] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2">
              <div className="product-orbit-ring" />
              <div className="product-orbit-ring product-orbit-ring--reverse" />
              <div className="ingredient-float left-[8%] top-[18%]">{activeProduct.ingredientLabel}</div>
              <div className="ingredient-float ingredient-float--delay right-[4%] top-[30%]">
                Pure bite
              </div>
              <div className="ingredient-float ingredient-float--slow bottom-[16%] left-[15%]">
                Natural
              </div>

              {products.map((product, index) => {
                const position = productPosition(index, activeIndex);
                const isActive = index === activeIndex;

                return (
                  <button
                    aria-label={`Show ${product.name}`}
                    className="product-image-wrap absolute left-1/2 top-1/2 transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                    key={product.name}
                    onClick={() => setActiveIndex(index)}
                    style={
                      {
                        ...position,
                        width: "var(--product-w)",
                        aspectRatio: "3 / 4.8",
                      } as CSSProperties
                    }
                    type="button"
                  >
                    <Image
                      alt={`${product.name} pouch`}
                      className={`object-contain drop-shadow-[0_34px_34px_rgba(0,0,0,.28)] transition duration-700 ${
                        isActive ? "saturate-100" : "saturate-[.78]"
                      }`}
                      fill
                      priority={isActive}
                      sizes="(max-width: 768px) 58vw, 360px"
                      src={product.image}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-30 order-2 mx-auto grid w-full max-w-7xl gap-3 lg:order-3 lg:col-span-2 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            <div className="hidden text-xs font-bold uppercase tracking-[0.18em] opacity-80 lg:block">
              Naturally colorful pantry favorites
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                aria-label="Previous product"
                className="grid h-12 w-12 place-items-center rounded-full border border-current/30 bg-[var(--hero-panel)] text-2xl font-black backdrop-blur-md transition hover:bg-white/25"
                onClick={previousProduct}
                type="button"
              >
                &lt;
              </button>
              <div className="flex rounded-full border border-current/25 bg-[var(--hero-panel)] p-1 backdrop-blur-md">
                {products.map((product, index) => (
                  <button
                    aria-label={`Go to ${product.name}`}
                    className={`h-9 rounded-full px-4 text-xs font-black transition ${
                      index === activeIndex ? "bg-[var(--hero-ink)] text-[var(--hero-theme)]" : "opacity-70 hover:opacity-100"
                    }`}
                    key={product.name}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
              <button
                aria-label="Next product"
                className="grid h-12 w-12 place-items-center rounded-full border border-current/30 bg-[var(--hero-panel)] text-2xl font-black backdrop-blur-md transition hover:bg-white/25"
                onClick={nextProduct}
                type="button"
              >
                &gt;
              </button>
            </div>
            <div className="text-center text-xs font-bold uppercase tracking-[0.18em] opacity-80 lg:text-right">
              Auto rotating every 4 seconds
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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

const primaryNav = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "mailto:hello@natureslove.example" },
];

const orbitSlots = [
  {
    transform: "translate3d(-50%, -50%, 0) scale(1) rotate(0deg)",
    opacity: 1,
    zIndex: 40,
  },
  {
    transform: "translate3d(20%, -46%, 0) scale(.56) rotate(8deg)",
    opacity: 0.72,
    zIndex: 30,
  },
  {
    transform: "translate3d(-50%, -78%, 0) scale(.42) rotate(-2deg)",
    opacity: 0.42,
    zIndex: 20,
  },
  {
    transform: "translate3d(-116%, -46%, 0) scale(.56) rotate(-8deg)",
    opacity: 0.72,
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
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

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
        <header className="glass-navbar relative z-40 mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3">
          <a
            className="shrink-0 text-sm font-black tracking-[0.18em] sm:text-base"
            href="#"
          >
            NATURESLOVE
          </a>

          <form
            className={`glass-expand-search ${searchOpen ? "glass-expand-search--open" : ""}`}
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <button
              aria-label={searchOpen ? "Focus search" : "Open search"}
              className="grid h-9 w-9 shrink-0 place-items-center"
              onClick={() => {
                setSearchOpen(true);
                window.setTimeout(() => searchInputRef.current?.focus(), 0);
              }}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <label className="sr-only" htmlFor="site-search">
              Search products
            </label>
            <input
              className="glass-search-input"
              id="site-search"
              onBlur={() => setSearchOpen(false)}
              placeholder="Search..."
              ref={searchInputRef}
              type="search"
            />
          </form>

          <nav className="ml-auto flex max-w-[64px] min-w-0 gap-1.5 overflow-hidden text-[10px] font-black uppercase tracking-[0.1em] md:max-w-none md:overflow-x-auto">
            {primaryNav.map((item) => (
              <a className="glass-nav-link" href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            aria-label="Account"
            className="glass-icon-link"
            href="#account"
            title="Account"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-5 py-5 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:py-4">
          <div className="relative z-30 order-3 max-w-xl lg:order-1">
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
            <h1 className="mt-4 max-w-[10ch] text-5xl font-black leading-[0.9] sm:text-7xl lg:text-8xl">
              Nature&apos;s Love
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

          <div className="relative order-1 min-h-[390px] sm:min-h-[520px] lg:order-2 lg:min-h-[680px] lg:translate-x-8 xl:translate-x-12">
            <div className="product-stage absolute left-1/2 top-1/2 z-10 h-[min(82vw,660px)] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2">
              <p className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-6xl font-black uppercase leading-none tracking-normal text-white/20 sm:text-8xl lg:text-[9rem]">
                Snacks
              </p>
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

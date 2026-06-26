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
  { label: "Shop Now", href: "#products" },
];

const categoryLinks = [
  {
    label: "Nuts",
    href: "https://natureslove.lk/product-category/nuts/",
    icon: "/img/categories/nuts.png",
  },
  {
    label: "Seeds",
    href: "https://natureslove.lk/product-category/seeds/",
    icon: "/img/categories/seeds.png",
  },
  {
    label: "Dried Fruits",
    href: "https://natureslove.lk/product-category/dried-fruits/",
    icon: "/img/categories/dried-fruits.png",
  },
  {
    label: "Confectionery",
    href: "https://natureslove.lk/product-category/confectionery/",
    icon: "/img/categories/confectionery.png",
  },
  {
    label: "Natural Fiber",
    href: "https://natureslove.lk/product-category/natural-fiber/",
    icon: "/img/categories/natural-fiber.png",
  },
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
const firstRotationDelayMs = 2000;
const cranberryProductIndex = products.findIndex((product) => product.name === "Dried Cranberries");
const initialProductIndex = cranberryProductIndex >= 0 ? cranberryProductIndex : 0;

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
  const [activeIndex, setActiveIndex] = useState(initialProductIndex);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    const advanceProduct = () => {
      setActiveIndex((current) => (current + 1) % products.length);
    };

    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      advanceProduct();
      interval = window.setInterval(advanceProduct, rotationMs);
    }, firstRotationDelayMs);

    return () => {
      window.clearTimeout(timeout);

      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const closeMenuOnScroll = () => setMobileMenuOpen(false);

    window.addEventListener("scroll", closeMenuOnScroll, { passive: true });
    window.addEventListener("wheel", closeMenuOnScroll, { passive: true });
    window.addEventListener("touchmove", closeMenuOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
      window.removeEventListener("wheel", closeMenuOnScroll);
      window.removeEventListener("touchmove", closeMenuOnScroll);
    };
  }, [mobileMenuOpen]);

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

  const selectProduct = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <main
      className="min-h-screen overflow-hidden text-[var(--hero-ink)] transition-colors duration-700"
      style={heroStyle}
    >
      <section className="relative flex min-h-screen flex-col bg-[radial-gradient(circle_at_78%_16%,var(--hero-accent)_0,transparent_28%),radial-gradient(circle_at_14%_76%,rgba(255,255,255,.36)_0,transparent_26%),linear-gradient(135deg,var(--hero-theme)_0%,color-mix(in_srgb,var(--hero-theme)_78%,#25150a)_100%)] px-3 py-4 sm:px-8 sm:py-5 lg:px-12 lg:pt-0">
        <div className="hero-grain" />
        <header className="glass-navbar relative z-40 mx-auto flex w-full max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
          <a
            aria-label="NaturesLove home"
            className="flex shrink-0 items-center"
            href="#"
          >
            <Image
              alt="NaturesLove"
              className="h-8 w-auto object-contain sm:h-10"
              height={242}
              priority
              src="/img/natureslovelogo.png"
              width={583}
            />
          </a>

          <form
            className={`glass-expand-search ml-auto md:ml-0 ${searchOpen ? "glass-expand-search--open" : ""}`}
            onSubmit={(event) => event.preventDefault()}
            role="search"
          >
            <button
              aria-label={searchOpen ? "Focus search" : "Open search"}
              className="grid h-9 w-9 shrink-0 place-items-center"
              onClick={() => {
                setMobileMenuOpen(false);
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

          <nav className="ml-auto hidden min-w-0 gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] md:flex md:overflow-x-auto">
            {primaryNav.map((item) => (
              <a className="glass-nav-link" href={item.href} key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            aria-label="Account"
            className="glass-icon-link desktop-account-link"
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

          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`apple-menu-button mobile-menu-button ${mobileMenuOpen ? "apple-menu-button--open" : ""}`}
            onClick={() => {
              setSearchOpen(false);
              setMobileMenuOpen((open) => !open);
            }}
            type="button"
          >
            <span />
            <span />
          </button>
        </header>

        <div
          className={`mobile-nav-panel relative z-30 mx-auto w-full max-w-7xl md:hidden ${
            mobileMenuOpen ? "mobile-nav-panel--open" : ""
          }`}
          id="mobile-navigation"
        >
          <nav className="mobile-nav-panel__inner" aria-label="Mobile navigation">
            {primaryNav.map((item) => (
              <a
                className="mobile-nav-link"
                href={item.href}
                key={item.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobile-nav-link mobile-nav-link--account"
              href="#account"
              onClick={() => setMobileMenuOpen(false)}
            >
              Account
            </a>
          </nav>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-5 py-5 lg:-mt-[60px] lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:py-4">
          <div className="relative z-30 order-3 max-w-[30rem] self-start lg:order-1 lg:mt-[55px]">
            <h1 className="brand-title hero-brand-title hidden text-5xl leading-[0.86] sm:text-6xl lg:block lg:text-left lg:text-[5.6rem]">
              Nature&apos;s
              <br />
              Love
            </h1>
            <div
              className="product-detail-flow product-info-panel mt-6"
              key={activeProduct.name}
            >
              <p className="detail-flow-item detail-flow-item--1 product-info-eyebrow">
                {activeProduct.subtitle}
              </p>
              <h2 className="detail-flow-item detail-flow-item--2 product-info-name">
                {activeProduct.name === "Dried Blueberries" ? (
                  <>
                    Dried
                    <br />
                    Blueberries
                  </>
                ) : (
                  activeProduct.name
                )}
              </h2>
              <p className="detail-flow-item detail-flow-item--3 product-info-description">
                {activeProduct.description}
              </p>
            </div>
            <div className="category-quick-links" aria-label="Product categories">
              {categoryLinks.map((category) => (
                <a
                  aria-label={category.label}
                  className="category-quick-link"
                  href={category.href}
                  key={category.label}
                  rel="noreferrer"
                  target="_blank"
                  title={category.label}
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-7 object-contain"
                    height={48}
                    src={category.icon}
                    width={48}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="relative order-1 min-h-[350px] sm:min-h-[470px] lg:order-2 lg:min-h-[600px] lg:-translate-y-[30px] lg:translate-x-8 xl:translate-x-12">
            <div className="product-stage absolute left-1/2 top-1/2 z-10 h-[min(74vw,590px)] w-[min(84vw,640px)] -translate-x-1/2 -translate-y-1/2">
              <p className="brand-title mobile-carousel-brand md:hidden">
                Nature&apos;s
                <br />
                Love
              </p>
              <p className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-6xl font-black uppercase leading-none tracking-normal text-white/20 md:block sm:text-8xl lg:text-[9rem]">
                Snacks
              </p>
              <div className="product-orbit-ring" />
              <div className="product-orbit-ring product-orbit-ring--reverse" />
              <div className="product-orbit-icons product-orbit-icons--outer" aria-hidden="true">
                {categoryLinks.slice(0, 3).map((category, index) => (
                  <span
                    className={`product-orbit-icon product-orbit-icon--outer-${index + 1}`}
                    key={category.label}
                  >
                    <Image alt="" height={34} src={category.icon} width={34} />
                  </span>
                ))}
              </div>
              <div className="product-orbit-icons product-orbit-icons--inner" aria-hidden="true">
                {categoryLinks.slice(3).map((category, index) => (
                  <span
                    className={`product-orbit-icon product-orbit-icon--inner-${index + 1}`}
                    key={category.label}
                  >
                    <Image alt="" height={30} src={category.icon} width={30} />
                  </span>
                ))}
              </div>
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
                    onClick={() => selectProduct(index)}
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
        </div>
      </section>
    </main>
  );
}

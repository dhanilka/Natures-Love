import Image from "next/image";
import type { CSSProperties } from "react";

const featuredProducts = [
  {
    name: "Dried Mango Strips",
    slug: "dried-mango-strips",
    image: "/products/dried-mango-strips.png",
    price: "LKR 950",
    oldPrice: "LKR 1,150",
    rating: "4.9",
    reviewCount: "128",
    note: "Chewy tropical slices for cereal, yogurt, lunch boxes, and afternoon snacking.",
    href: "https://natureslove.lk/product-category/dried-fruits/",
    accent: "#ee9417",
    imageScale: "1",
    imageY: "0px",
  },
  {
    name: "Dried Blueberries",
    slug: "dried-blueberries",
    image: "/products/dried-blueberries.png",
    price: "LKR 1,250",
    oldPrice: "LKR 1,480",
    rating: "4.8",
    reviewCount: "96",
    note: "A bold berry bite for breakfast bowls, trail mixes, and quick pantry treats.",
    href: "https://natureslove.lk/product-category/dried-fruits/",
    accent: "#123d66",
    imageScale: "1.03",
    imageY: "0px",
  },
  {
    name: "Dried Cranberries",
    slug: "dried-cranberries",
    image: "/products/dried-cranberries.png",
    price: "LKR 1,100",
    oldPrice: "LKR 1,320",
    rating: "4.9",
    reviewCount: "114",
    note: "Tart, vivid cranberries for smoothie bowls, oats, salads, and snack mixes.",
    href: "https://natureslove.lk/product-category/dried-fruits/",
    accent: "#a7132e",
    imageScale: "1.12",
    imageY: "2px",
  },
  {
    name: "Green Pumpkin Seeds",
    slug: "green-pumpkin-seeds",
    image: "/products/green-pumpkin-seeds.png",
    price: "LKR 875",
    oldPrice: "LKR 1,050",
    rating: "4.7",
    reviewCount: "82",
    note: "Clean seed crunch for salads, rice bowls, cereal toppings, and light snacking.",
    href: "https://natureslove.lk/product-category/seeds/",
    accent: "#075633",
    imageScale: "1.13",
    imageY: "2px",
  },
];

function RatingStars({ label }: { label: string }) {
  return (
    <span aria-label={`${label} out of 5 stars`} className="featured-rating-stars" role="img">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg aria-hidden="true" key={index} viewBox="0 0 24 24">
          <path d="M12 2.8 14.8 8.6 21.2 9.5 16.6 14 17.7 20.4 12 17.4 6.3 20.4 7.4 14 2.8 9.5 9.2 8.6 12 2.8Z" />
        </svg>
      ))}
    </span>
  );
}

export function FeaturedProducts() {
  return (
    <section className="featured-products" id="products">
      <div className="featured-products-shell">
        <div className="featured-products-grid">
          {featuredProducts.map((product) => (
            <article className="featured-product-card" key={product.name}>
              <a
                aria-label={`View ${product.name}`}
                className={`featured-product-image featured-product-image--${product.slug}`}
                href={product.href}
                rel="noreferrer"
                style={
                  {
                    "--product-accent": product.accent,
                    "--image-scale": product.imageScale,
                    "--image-y": product.imageY,
                  } as CSSProperties
                }
                target="_blank"
              >
                <Image
                  alt={`${product.name} pouch`}
                  fill
                  sizes="(min-width: 1180px) 18vw, (min-width: 720px) 38vw, 72vw"
                  src={product.image}
                />
              </a>

              <div className="featured-product-body">
                <div className="featured-product-meta">
                  <span>{product.reviewCount} reviews</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.note}</p>

                <div className="featured-product-rating">
                  <RatingStars label={product.rating} />
                  <strong>{product.rating}</strong>
                </div>

                <div className="featured-product-footer">
                  <div>
                    <strong>{product.price}</strong>
                    <span>{product.oldPrice}</span>
                  </div>
                  <a href={product.href} rel="noreferrer" target="_blank">
                    Shop
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="featured-products-action">
          <a className="featured-products-view-more" href="https://natureslove.lk/shop/">
            View more
          </a>
        </div>
      </div>
    </section>
  );
}

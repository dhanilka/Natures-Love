import Image from "next/image";

import { CountUpNumber } from "./count-up-number";

const reviewCards = [
  {
    name: "Nimali P.",
    note: "The dried fruits taste fresh and clean. My kids add mango strips to school snacks every week.",
  },
  {
    name: "Rushan K.",
    note: "Pumpkin seeds became part of our breakfast routine. Good texture, easy to mix, and nicely packed.",
  },
  {
    name: "Ayesha M.",
    note: "I like that the packs feel premium and trustworthy. Blueberries are great with curd and cereal.",
  },
];

const productStories = [
  {
    name: "Dried Mango Strips",
    image: "/products/dried-mango-strips.png",
    benefit: "Bright tropical energy with a naturally chewy bite.",
    eat: "Enjoy as a snack, cut into cereal, or mix with yogurt and overnight oats.",
  },
  {
    name: "Dried Blueberries",
    image: "/products/dried-blueberries.png",
    benefit: "A fruit-forward pantry favorite for color, taste, and everyday variety.",
    eat: "Sprinkle over cereal, blend into smoothie bowls, or pair with nuts for a quick trail mix.",
  },
  {
    name: "Green Pumpkin Seeds",
    image: "/products/green-pumpkin-seeds.png",
    benefit: "A crisp seed crunch that brings plant-based goodness to daily meals.",
    eat: "Add to salads, rice bowls, cereal, or enjoy straight from the pack as a light snack.",
  },
];

export function BlogSection() {
  return (
    <section className="blog-section" id="blog">
      <div className="blog-shell">
        <div className="blog-hero">
          <div className="blog-copy">
            <p className="about-kicker">Nature&apos;s Love Blog</p>
            <h2>Simple ways to enjoy natural snacks every day.</h2>
            <p>
              Ideas from the pantry: quick breakfast mixes, smarter snack moments, and
              naturally colorful ways to use Nature&apos;s Love favorites.
            </p>
          </div>
          <div className="blog-trust-card">
            <div className="blog-trust-label">
              <span>Trusted by</span>
              <small>verified community</small>
            </div>
            <div className="blog-trust-number">
              <CountUpNumber end={2000} suffix="+" />
              <p>happy snack lovers, families, and wellness-focused customers.</p>
            </div>
          </div>
        </div>

        <div className="blog-product-grid">
          {productStories.map((product) => (
            <article className="blog-product-card" key={product.name}>
              <div className="blog-product-image">
                <Image
                  alt={`${product.name} pouch`}
                  fill
                  sizes="(min-width: 900px) 22vw, 82vw"
                  src={product.image}
                />
              </div>
              <div>
                <h3>{product.name}</h3>
                <p>{product.benefit}</p>
                <dl>
                  <dt>How to eat</dt>
                  <dd>{product.eat}</dd>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-review-panel" aria-label="Customer reviews">
          <div>
            <p className="about-kicker">Customer Reviews</p>
            <h3>Real pantry habits from people who keep coming back.</h3>
          </div>
          <div className="blog-review-grid">
            {reviewCards.map((review) => (
              <article className="blog-review-card" key={review.name}>
                <div aria-hidden="true" className="blog-stars">
                  ★★★★★
                </div>
                <p>{review.note}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

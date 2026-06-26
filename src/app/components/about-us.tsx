import Image from "next/image";

import { ScrollReveal } from "./scroll-reveal";
import { StoryTypewriter } from "./story-typewriter";

const trustItems = [
  {
    title: "Fast Shipping",
    image: "/img/about-us/fast-delivery.jpg",
  },
  {
    title: "100% Safest Payments",
    image: "/img/about-us/safe-payments.jpg",
  },
  {
    title: "24/7 Customer Support",
    image: "/img/about-us/customer-support.jpg",
  },
];

const values = [
  ["Purity", "No artificial additives, no shortcuts."],
  ["Integrity", "Always honest, always transparent."],
  ["Care", "For people, for nature, for communities."],
  ["Quality", "Certified processes ensuring excellence."],
  ["Sustainability", "Ethical sourcing and earth-friendly practices."],
];

const footerLinks = [
  ["About Us", "https://natureslove.lk/about-us/"],
  ["Shop", "https://natureslove.lk/shop/"],
  ["Blog", "https://natureslove.lk/blog/"],
  ["Contact Us", "https://natureslove.lk/contact-us/"],
  ["Track your order", "https://natureslove.lk/track-order/"],
];

const socialLinks = [
  ["Instagram", "https://www.instagram.com/natureslove.lk/"],
  ["Facebook", "https://www.facebook.com/natureslove.lk/"],
  ["Tiktok", "https://www.tiktok.com/@natureslove.lk"],
];

const storyParagraphs = [
  "Nature's Love began in 2018 with a simple, heartfelt dream - to reconnect people with the purity of nature. From the very beginning, our dear friend, Sethum Products, has inspired and guided our journey. Together, we share values, support farming communities, and walk hand-in-hand on a mission to promote healthier, more natural living.",
  "This friendship with Sethum Products has taught us that food is far more than taste - it is responsibility, honesty, care, and love. Every nut, seed, and dried fruit we bring to you carries the story of dedicated farmers, nurturing land, and human connection.",
  "For us, Nature's Love is not just a business - it is a promise to nourish your family with food that loves you back, made with care, heart, and deep respect for nature and community.",
];

export function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="about-shell">
        <div className="about-intro">
          <ScrollReveal className="about-copy about-intro-copy-reveal">
            <p className="about-kicker">About Us</p>
            <h2>Nature&apos;s love, carefully packed for you.</h2>
            <p>
              At Nature&apos;s Love Company, we believe food is more than nourishment - it is
              love, care, and connection. Since 2018, our mission has been simple: to bring
              the purest, most wholesome gifts of nature straight to your home.
            </p>
            <p>
              We carefully source and lovingly process the finest nuts, seeds, and dried
              fruits, ensuring every product reflects honesty, purity, and life-giving
              nutrition. With GMP, HACCP, and ISO 22000 certifications, we guarantee safety,
              quality, and excellence in every pack.
            </p>
          </ScrollReveal>

          <div className="about-visual" aria-label="Nature's Love products">
            <Image
              alt="Dried mango strips pouch"
              className="about-product about-product--left"
              height={820}
              src="/products/dried-mango-strips.png"
              width={512}
            />
            <Image
              alt="Green pumpkin seeds pouch"
              className="about-product about-product--center"
              height={820}
              priority={false}
              src="/products/green-pumpkin-seeds.png"
              width={512}
            />
            <Image
              alt="Dried cranberries pouch"
              className="about-product about-product--right"
              height={820}
              src="/products/dried-cranberries.png"
              width={512}
            />
          </div>
        </div>

        <div className="about-trust" aria-label="Service promises">
          <div className="about-trust-heading">
            <span />
            <h2>Grow Your Amazing Business</h2>
            <span />
          </div>
          <div className="about-trust-cards">
            {trustItems.map((item) => (
              <article className="about-trust-card" key={item.title}>
                <div className="about-trust-image">
                  <Image alt="" aria-hidden="true" fill sizes="(min-width: 900px) 28vw, 90vw" src={item.image} />
                </div>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="about-story">
          <div className="about-story-heading">
            <p className="about-kicker">Since 2018</p>
            <h2>
              <span>A Journey</span>
              <span>Inspired by Friendship</span>
              <span>&amp; Purpose</span>
            </h2>
          </div>
          <StoryTypewriter paragraphs={storyParagraphs} />
        </div>

        <div className="about-mvv" aria-label="Mission, vision and values">
          <ScrollReveal className="about-mvv-lead about-mvv-lead-reveal">
            <p className="about-kicker">Mission, Vision & Values</p>
            <h2>
              <span>Pure food.</span>
              <span>Clear purpose.</span>
            </h2>
            <p>
              A simple promise behind every pack: natural food, careful sourcing, and
              quality families can trust.
            </p>
          </ScrollReveal>
          <div className="about-mvv-cards">
            <article className="about-mvv-card" tabIndex={0}>
              <span className="about-mvv-index">01</span>
              <h3>Our Mission</h3>
              <p>
                To provide pure, natural, and nutrient-rich foods that promote healthy
                living and inspire people to choose wellness every day.
              </p>
            </article>
            <article className="about-mvv-card" tabIndex={0}>
              <span className="about-mvv-index">02</span>
              <h3>Our Vision</h3>
              <p>
                To become a global symbol of trust in natural foods, enriching lives
                through purity, sustainability, and heartfelt care.
              </p>
            </article>
            <article className="about-mvv-card about-values" tabIndex={0}>
              <span className="about-mvv-index">03</span>
              <h3>Our Values</h3>
              <ul>
                {values.map(([title, copy]) => (
                  <li key={title}>
                    <strong>{title}:</strong> {copy}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="about-contact" id="contact">
          <div>
            <p className="about-kicker">Have a question?</p>
            <h2>Contact us here.</h2>
          </div>
          <div className="about-contact-grid">
            <a href="https://wa.me/+94717663766">+94 71 766 3766</a>
            <span>Monday - Friday, 9:00am - 5:00pm</span>
            <a href="mailto:contactus@natureslove.lk">contactus@natureslove.lk</a>
          </div>
        </div>

        <footer className="about-footer">
          <div>
            <Image
              alt="Nature's Love"
              className="about-footer-logo"
              height={242}
              src="/img/natureslovelogo.png"
              width={583}
            />
            <p>Pay safely and securely with Nature&apos;s Love.</p>
          </div>
          <nav aria-label="Footer navigation">
            {footerLinks.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <nav aria-label="Social links">
            {socialLinks.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <p className="about-copyright">
            Copyright © 2026 Nature&apos;s Love. Design & Develop by{" "}
            <a href="https://zentrode.com/">Zentrode</a>.
          </p>
        </footer>
      </div>
    </section>
  );
}

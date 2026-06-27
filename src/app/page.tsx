import { AboutUs } from "./components/about-us";
import { FeaturedProducts } from "./components/featured-products";
import { ProductHero } from "./components/product-hero";

export default function Home() {
  return (
    <>
      <ProductHero />
      <FeaturedProducts />
      <AboutUs />
    </>
  );
}

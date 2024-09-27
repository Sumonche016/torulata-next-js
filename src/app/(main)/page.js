import HeroSection from "@/components/HeroSection";
import LandScape from "@/components/LandScape";
import ProductCard from "@/components/ProductCard";
import Contact from "@/components/ui/contactUs";

const page = ({ searchParams }) => {
  return (
    <div>
      <HeroSection />
      <LandScape searchParams={searchParams} />
      <ProductCard searchParams={searchParams} />
      <Contact/>
    </div>
  );
};

export default page;

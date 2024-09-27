import SideNav from "./SideNav";
import Slider from "./Slider";

const HeroSection = () => {
  return (
    <div className="container  mx-auto  md:pt-[10rem] pt-[9rem]">
      <div className="flex">
        <SideNav />
        <Slider />
      </div>
    </div>
  );
};

export default HeroSection;

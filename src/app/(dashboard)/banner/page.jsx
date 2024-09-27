import { getAllbanner } from "@/lib/getBanner";
import Banner from "./Banner";

const page = async () => {
  const bannerData = await getAllbanner();
  return (
    <div>
      <Banner banners={bannerData.result} />
    </div>
  );
};

export default page;

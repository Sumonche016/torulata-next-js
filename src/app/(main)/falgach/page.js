import { getAllProducts } from "@/lib/getAllProducts";
import AllFalGach from "./AllFalGach";
import { Suspense } from "react";
import SuspanseLoader from "@/app/(dashboard)/banner/SuspanseLoader";

const page = async () => {
  let payload = {
    limit: "20",
    category: "ফল গাছ",
  };
  let products = await getAllProducts(payload);

  return (
    <div className="md:w-[80%] w-[95%] mx-auto py-[10rem]">
      <h1 className=" text-center my-6 text-3xl text-primary-text font-semibold  text-[#212b36]">
        সর্বাধিক বিক্রিত ফল গাছ
      </h1>
      <Suspense fallback={<SuspanseLoader />}>
        <AllFalGach res={products} />
      </Suspense>
    </div>
  );
};

export default page;

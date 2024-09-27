import Image from "next/image";
import ContactUsButton from "./ui/ContactUsButton";
import LandScapeTab from "./LandScapeTab";

async function getAllProductLandScape(searchParams) {
  console.log(searchParams, "params");
  let categoryLand = searchParams?.landScape
    ? searchParams?.landScape
    : "ছাদ বাগান";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/findProductByLandscape?landScape=${categoryLand}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const LandScape = async ({ searchParams }) => {
  const categories = [
    { name: "ছাদ বাগান", value: "ছাদ বাগান" },
    { name: "অফিস ইন্টেরিয়র", value: "অফিস ইন্টেরিয়র" },
    { name: "রেস্টুরেন্ট ইন্টেরিয়র", value: "রেস্টুরেন্ট ইন্টেরিয়র" },
    {
      name: "রিসোর্ট ল্যান্ডস্ক্যাপ ডিজাইন",
      value: "রিসোর্ট ল্যান্ডস্ক্যাপ ডিজাইন",
    },
    { name: "ফ্যাক্টরি গ্রীন প্রজেক্ট", value: "ফ্যাক্টরি গ্রীন প্রজেক্ট" },
    { name: "বেলকনি বাগান", value: "বেলকনি বাগান" },
    { name: "হোম গ্রীন ডেকোর", value: "হোম গ্রীন ডেকোর" },
  ];

  let res = await getAllProductLandScape(searchParams);

  return (
    <div className="md:w-[80%] w-[95%] mx-auto py-[5rem]">
      <div className="   mb-6">
        <h1 className=" text-center mb-4  text-3xl text-primary-text font-semibold  text-[#212b36]">
          ল্যান্ডস্কেপিং প্রজেক্ট
        </h1>

        <LandScapeTab categories={categories} searchParams={searchParams} />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1  gap-6">
        {res?.data.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-3 rounded-[5px]">
            <Image
              className="rounded-md"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              src={item.product_images}
              alt={item.product_title}
            />
            <ContactUsButton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandScape;

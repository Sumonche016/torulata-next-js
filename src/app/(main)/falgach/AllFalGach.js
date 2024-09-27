"use client";
import BuyNowButton from "@/components/BuyNowButton";
import Image from "next/image";
import Link from "next/link";
import cn from "clsx";
import { useState } from "react";

const AllFalGach = ({ res }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
      {res.data.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow-card border border-card rounded-[8px]"
        >
          <Link href={`/product/${item._id}`}>
            <div className="relative md:h-[15rem] h-[12rem] w-full ">
              <Image
                alt={item.product_title}
                className={cn(
                  "duration-700 ease-in-out p-2 rounded-sm",
                  isLoading
                    ? "grayscale blur-xl scale-100"
                    : "grayscale-0 blur-0 scale-100"
                )}
                src={item.product_images}
                layout="fill" // Make the image fill the parent
                objectFit="cover" // Ensure the image covers the whole area
                quality={75} // Adjust the quality of the image
                loading="lazy" // Enable lazy loading
                onLoadingComplete={() => setLoading(false)}
              />
            </div>

            <div className="text-center p-3">
              <div>
                <div className=" text-sm sm:text-lg md:text-[1rem] ">
                  <h3 className="truncate font-medium text-[#212b36]">
                    {item.product_title}
                  </h3>
                </div>

                <div className=" flex justify-between items-center w-full">
                  <div className="w-full">
                    <div className="flex items-center justify-center">
                      <p className="text-sm sm:text-lg font-medium text-center">
                        &#2547; {item.product_price}{" "}
                      </p>
                      <del className="text-xs hidden sm:text-sm   font-bold ml-1">
                        &#2547;800
                      </del>
                    </div>
                    <div className="mt-2 flex  items-center w-full">
                      <BuyNowButton product={item} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllFalGach;

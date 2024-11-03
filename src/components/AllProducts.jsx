"use client";
import Image from "next/image";
import BuyNowButton from "./BuyNowButton";
import { useState } from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
const AllProducts = ({ res }) => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {res.data.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-card border border-card rounded-[8px]"
          >
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/product/${item._id}`)}
            >
              <div className="relative md:h-[18rem] h-[11rem] w-full">
                <Image
                  alt={item.product_title}
                  className={cn(
                    "duration-700 ease-in-out p-2 rounded-sm",
                    isLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                  src={item.product_images}
                  fill={true} // Make the image fill the parent
                  style={{ objectFit: "cover" }} // Ensure the image covers the whole area
                  quality={75} // Adjust the quality of the image
                  loading="lazy" // Enable lazy loading
                  onLoad={() => setLoading(false)}
                />
              </div>

              <div className="text-center p-3 pt-1">
                <div>
                  <div className="text-sm sm:text-lg md:text-[1rem]">
                    <h3 className="truncate font-medium text-[#212b36]">
                      {item.product_title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="w-full">
                      <div className="flex items-center justify-center">
                        <p className="text-sm sm:text-lg font-medium text-center">
                          &#2547; {item.product_price}
                        </p>
                        <del className="text-xs hidden sm:text-sm font-bold ml-1">
                          &#2547;800
                        </del>
                      </div>
                      <div
                        className="mt-2 flex items-center w-full"
                        onClick={handleBuyNowClick}
                      >
                        <BuyNowButton product={item} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

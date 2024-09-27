import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import AddToCart from "./[productId]/AddToCart";

const window = new JSDOM("").window;
const DOMPurifyServer = DOMPurify(window);
const SingleProductCard = ({ product }) => {
  return (
    <div>
      <div className="max-w-5xl mx-auto bg-white border border-borderDark p-4 rounded-md">
        <div className="flex md:flex-row flex-col items-start gap-4">
          <div className="md:w-1/2 w-full border border-borderDark rounded-md h-full">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",

                borderRadius: "5px",
              }}
              alt="product image"
              src={product.data.product_images}
            />
          </div>
          <div className="md:w-1/2 w-full py-6">
            <h1 className="text-xl mb-3 font-semibold text-[#212B36] self-start">
              {product.data.product_title}
            </h1>
            <div className="mt-3">
              <div className="flex gap-2 items-center font-semibold">
                <h1>Price:</h1>
                <h1 className="text-primary">{product.data.product_price}tk</h1>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex gap-2 items-center font-medium">
                <h1>Category:</h1>

                {product.data.product_category.map((item) => (
                  <h1 key={item} className="text-[#637381]">
                    {product.data.product_category}
                  </h1>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex gap-2 items-center font-medium">
                <h1>Available:</h1>
                <h1 className="text-[#637381]">210 items</h1>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex gap-2 items-center font-medium">
                <h1>Discount:</h1>
                <h1 className="text-[#637381]">
                  0.0 <span className="text-red-500">(0% Discount)</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="bg-[#F5F5F5] p-2 rounded-md cursor-pointer">
                <AiOutlineMinus />
              </div>
              <div className="font-semibold">{1}</div>
              <div className="bg-[#F5F5F5] p-2 rounded-md cursor-pointer">
                <AiOutlinePlus />
              </div>
            </div>

            <AddToCart product={product} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-white border border-borderDark p-4 rounded-md mt-8">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurifyServer.sanitize(
              product.data.product_info.product_details
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SingleProductCard;

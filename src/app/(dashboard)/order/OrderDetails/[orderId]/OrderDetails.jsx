import { formatTime } from "@/utils/formatTime";
import OrderDeatilsTable from "../OrderDeatilsTable";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const OrderDetails = ({ singleOrderData }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-[1.2rem] font-medium">
            Order Id :{" "}
            <span className="text-primary-deep-green">
              {singleOrderData._id}
            </span>
          </h1>
          <Link href={"/order"}>
            <h1 className="flex gap-2 hover:text-green-500 duration-150 items-center font-medium cursor-pointer">
              <IoIosArrowBack />
              Back
            </h1>
          </Link>
        </div>

        <div className="flex gap-4 pt-6">
          <div className="w-[60%] ">
            <div className="bg-white rounded-[10px]">
              <OrderDeatilsTable singleOrderData={singleOrderData} />
            </div>

            <div className="bg-white rounded-[10px] mt-6 p-4">
              <h1 className="text-[15px] font-medium ">Customer Details:</h1>
              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Customer Name</h1>
                <h1>{singleOrderData?.address?.name}</h1>
              </div>

              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Phone Number</h1>
                <h1>{singleOrderData?.address?.phone}</h1>
              </div>
              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Delivary Address</h1>
                <h1>{singleOrderData?.address?.address}</h1>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <div className="bg-white rounded-[10px] p-4">
              <div className=" text-[14px] font-medium flex justify-between">
                <h1>Order Summary:</h1>
                {/* <h1>{statusShow(singleOrderData?.order_status)}</h1> */}
              </div>
              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Order Created</h1>
                <h1>{formatTime(singleOrderData?.createdAt)}</h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Product price</h1>
                <h1>
                  {singleOrderData?.products?.reduce(
                    (acc, obj) => acc + obj?.totalPrice,
                    0
                  )}{" "}
                  ৳
                </h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Delivary Fee</h1>
                <h1>100৳</h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Sub Total</h1>
                <h1>
                  {singleOrderData?.products?.reduce(
                    (acc, obj) => acc + obj?.totalPrice,
                    0
                  ) + 100}
                  ৳
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

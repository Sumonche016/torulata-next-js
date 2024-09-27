"use client";
import CartComponent from "@/components/CartComponent";
import DeliveryAddress from "@/components/DelivaryAddresh";
import OrderSummery from "@/components/OrderSummery";

const page = () => {
  return (
    <div className="py-[10rem]">
      <div className="flex flex-col md:flex-row items-center gap-8 container mx-auto">
        <div className="md:w-1/2 w-full bg-white p-4 rounded-md">
          <CartComponent />
          <OrderSummery />
        </div>
        <div className="md:w-1/2 w-full bg-white p-4 rounded-md">
          <DeliveryAddress />
        </div>
      </div>
    </div>
  );
};

export default page;

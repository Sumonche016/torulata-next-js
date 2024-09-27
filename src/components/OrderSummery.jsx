"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

const OrderSummery = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const refetch = useAppSelector((state) => state.productSlice.refetch);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    const calculatedTotalPrice = storedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [refetch]);
  return (
    <div className="border-t border-borderDark mt-6 rounded-md">
      <h1 className="text-xl font-medium mt-4">Order Summery</h1>
      <div className="space-y-4">
        <div className="flex justify-between mt-4">
          <h1 className="font-medium">SubTotal</h1>
          <h1 className="font-semibold">
            {totalPrice} {""}tk
          </h1>
        </div>
        <div className="flex justify-between border-b pb-2 border-borderDark">
          <h1 className="font-medium">Delivary Charge</h1>
          <h1 className="font-semibold">100 {""} tk</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="font-medium">Total</h1>
          <h1 className="font-semibold">
            {totalPrice + 100} {""} tk
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;

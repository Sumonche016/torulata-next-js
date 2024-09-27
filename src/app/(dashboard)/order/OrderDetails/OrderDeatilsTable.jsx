"use client";

import Image from "next/image";

const OrderDetailsTable = ({ singleOrderData }) => {
  return (
    <div className="bg-white rounded-[10px] p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-center">Product Image</th>
            <th className="p-2 text-left">Items Summary</th>
            <th className="p-2 text-center">Quantity</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-right">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {singleOrderData?.products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="p-2 text-center">
                <div className="flex justify-center">
                  <Image
                    width={80}
                    height={80}
                    className="rounded-[10px]"
                    src={product.product_images}
                    alt={singleOrderData._id}
                  />
                </div>
              </td>
              <td className="p-2 text-left">{product.product_title}</td>
              <td className="p-2 text-center">{product.quantity}</td>
              <td className="p-2 text-right">{product.product_price}</td>
              <td className="p-2 text-right">{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsTable;

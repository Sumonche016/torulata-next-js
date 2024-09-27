"use client";

import { addProductToCart } from "@/hooks/cartFunctions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateRefetch } from "@/lib/ProductSlice/productSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const AddToCart = ({ product }) => {
  console.log(product);
  const dispatch = useAppDispatch();
  const [isInCart, setIsInCart] = useState(false);
  const refetch = useAppSelector((state) => state.productSlice.refetch);
  useEffect(() => {
    // Check if the product is already in the cart when the component mounts
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const existingProduct = products.find((p) => p._id === product.data._id);

    setIsInCart(!!existingProduct);
  }, [product.data._id, refetch]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToCart(product.data);
    setIsInCart(true); // Update the state to reflect the product is in the cart
    dispatch(updateRefetch());
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const products = localStorage.getItem("products");

      const allProducts = products ? JSON.parse(products) : [];

      const updatedProducts = allProducts.filter(
        (productDelete) => productDelete._id !== product.data._id
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setIsInCart(false);
      dispatch(updateRefetch());
    }
  };

  const router = useRouter();
  const handleBuyNow = () => {
    if (isInCart) {
      router.push("/checkout");
    } else {
      addProductToCart(product.data);
      // Update the state to reflect the product is in the cart
      dispatch(updateRefetch());
      router.push("/checkout");
    }
  };

  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
        className="px-2 py-3 bg-primary text-white font-medium w-1/2 rounded-md shadow-sm"
      >
        {isInCart ? "Remove From Cart" : "Add To Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        className="px-2 py-3 bg-[#059669] text-white font-medium w-1/2 rounded-md shadow-sm"
      >
        Buy Now
      </button>
    </div>
  );
};

export default AddToCart;

"use client";
import { useEffect, useState } from "react";
import { addProductToCart } from "@/hooks/cartFunctions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateRefetch } from "@/lib/ProductSlice/productSlice";
import ContactUsButton from "./ui/ContactUsButton";

const BuyNowButton = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isInCart, setIsInCart] = useState(false);
  const refetch = useAppSelector((state) => state.productSlice.refetch);
  useEffect(() => {
    // Check if the product is already in the cart when the component mounts
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const existingProduct = products.find((p) => p._id === product._id);
    setIsInCart(!!existingProduct);
  }, [product._id, refetch]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToCart(product);
    setIsInCart(true); // Update the state to reflect the product is in the cart
    dispatch(updateRefetch());
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const products = localStorage.getItem("products");

      const allProducts = products ? JSON.parse(products) : [];

      const updatedProducts = allProducts.filter(
        (productDelete) => productDelete._id !== product._id
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setIsInCart(false);
      dispatch(updateRefetch());
    }
  };

  return (
    <div className="w-full">
      {product.product_price == 0 || !product.product_price ? (
        <ContactUsButton />
      ) : (
        <button
          onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
          className={`px-3 py-2 border border-input rounded-[5px] w-full text-xs sm:text-sm font-medium ${
            isInCart
              ? "bg-primary text-white"
              : "hover:bg-primary hover:text-white"
          }   duration-100 ease-in-out`}
        >
          {isInCart ? "Remove From Cart" : "Add To Cart"}
        </button>
      )}
    </div>
  );
};

export default BuyNowButton;

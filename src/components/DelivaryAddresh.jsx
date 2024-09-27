"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSave, FaSpinner } from "react-icons/fa";

const DeliveryAddress = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [productCount, setProductCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    setProductCount(products.length);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      product: JSON.parse(localStorage.getItem("products")),
      address: data,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SEVER_API}/odder/new-odder`,
        orderData
      );

      // Optionally clear the cart and form
      // localStorage.removeItem("products");
      if (response.data.success) {
        router.push("/");
        toast.success("Order added successfully");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      {/* shopping address */}
      <div className="py-6 px-2">
        <h4 className="text-red-700 flex font-semibold items-center text-center py-4 border-b border-borderDark">
          অর্ডার কনফার্ম করতে আপনার নাম, মোবাইল নাম্বর, ঠিকানা লিখে অর্ডার করুন
          বাটনে ক্লিক করুন।
        </h4>
        {/* use form for address */}
        <form id="checkoutform" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="">
              {/* user name */}
              <div className="form-control mb-2">
                <label className="label">
                  <span className="block mb-1.5 text-sm font-medium">
                    নাম <span className="text-red-700 text-lg">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন..."
                  className="bg-[#E3E2E2]  rounded-md md:rounded-md focus:outline-primary block w-full p-2.5"
                  {...register("name", { required: true })}
                />
                {errors?.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 mt-2">
                    নাম অবশ্যই লিখতে হবে
                  </span>
                )}
              </div>
              {/* your phone number */}
              <div className="form-control">
                <label className="label">
                  <span className="block mb-1.5  font-medium">
                    মোবাইল
                    <span className="text-red-700 text-lg">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার মোবাইল নাম্বার লিখুন..."
                  className="bg-[#E3E2E2] rounded-md md:rounded-md focus:outline-primary block w-full p-2.5"
                  {...register("phone", {
                    required: "ফোন নম্বর অবশ্যই দিতে হবে",
                    pattern: {
                      value: /^(00|88|01|\+88)[0-9]{9}$/,
                      message: "ফোন নম্বর সঠিক নয়",
                    },
                  })}
                />
                {errors?.phone && (
                  <span className="label-text-alt text-red-500 mt-2">
                    {errors?.phone.message}
                  </span>
                )}
              </div>
            </div>
            {/* contact address */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="block mb-1.5  font-medium">ঠিকানা</span>
              </label>
              <textarea
                rows="5"
                cols="50"
                placeholder="আপনার ঠিকানা লিখুন..."
                className="bg-[#E3E2E2]  rounded-md md:rounded-md focus:outline-primary block w-full p-2.5"
                {...register("address", {
                  maxLength: {
                    value: 200,
                    message: "ঠিকানা অনুমোদিত সীমা ছাড়িয়ে গেছে",
                  },
                })}
              />
              {errors?.address?.message && (
                <span className="label-text-alt text-red-500 mt-2 inline-block">
                  {errors?.address.message}
                </span>
              )}
            </div>

            {/* Delivery location */}
            <div className="form-control mt-4">
              <span className="text-base md:text-[1rem] text-primary-black">
                <div className="inline-flex items-center my-4">
                  ডেলিভারি চার্জ
                </div>
              </span>
              <div className="flex gap-6">
                <input checked type="checkbox" name="" id="" />
                <label htmlFor="">100tk</label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-primary inline-flex items-center justify-center text-white px-[20px] py-[13px] rounded-md"
                disabled={productCount === 0 || isSubmitting} // Disable button if no products or while submitting
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isSubmitting ? "অর্ডার হচ্ছে..." : "অর্ডার করুন"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* order biboroni */}
    </div>
  );
};

export default DeliveryAddress;

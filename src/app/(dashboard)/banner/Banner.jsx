"use client";
import { customRevalidateTag } from "@/lib/customRevalidate";
import axios from "axios";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Spin, Modal } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Banner = ({ banners }) => {
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageAdd = async (e) => {
    setImageUploadLoading(true);
    const imageFile = e.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=3d10492adfa8561b3f13d1051a54448e`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SEVER_API}/banner/add`,
        { url: result.data.display_url }
      );

      customRevalidateTag("banner");
      setImageUploadLoading(false);
      toast.success("Image upload Successful");
    } catch (error) {
      console.log("Error during upload:", error.message);
      setImageUploadLoading(false);
      toast.error("Upload fail");
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this image?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        loading: deleting,
      },
    });
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SEVER_API}/banner/delete/${id}`
      );
      customRevalidateTag("banner");
      setDeleting(false);
      toast.success("Image delete Successful");
    } catch (error) {
      console.log("Error during delete:", error.message);
      setDeleting(false);
      toast.error("Delete failed");
    }
  };

  if (imageUploadLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-x-6 my-10 items-start">
        <div className="flex items-center justify-center w-full max-w-2xl">
          <button
            onClick={handleButtonClick}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-700">
                PNG, JPG || Recommend Size (height-418 width-1200)
              </p>
            </div>
          </button>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            accept=".png, .jpg, .jpeg"
            type="file"
            className="hidden"
            onChange={handleImageAdd}
          />
        </div>

        {/* banner table */}
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <Image
                      src={banner.url}
                      alt={`Banner ${index + 1}`}
                      className="w-32 h-auto"
                      height={100}
                      width={100}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => showDeleteConfirm(banner._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Banner;

"use client";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import { BsBoxFill } from "react-icons/bs";

import dynamic from "next/dynamic";
const ComponentA = dynamic(() => import("./AddProduct"), { ssr: false });
const AddProductDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="mb-6">
      <div className="flex justify-end items-center ">
        <button
          onClick={toggleDrawer}
          className=" inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-3 rounded-md text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600"
          type="button"
        >
          <span className="mr-2">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
          Add Product
        </button>
      </div>

      <Drawer
        size={"80vw"}
        lockBackgroundScroll={true}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="relative overflow-y-auto"
      >
        <div className="drawer-header bg-[#F5F6F7]  flex justify-between items-center mb-6 p-6">
          <div className="flex  items-center gap-4">
            <BsBoxFill />
            <h1 className="font-semibold">Add Product Here</h1>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleDrawer}
          >
            <RxCross2 />
            <h1>Close</h1>
          </div>
        </div>
        <ComponentA />
      </Drawer>
    </div>
  );
};

export default AddProductDrawer;

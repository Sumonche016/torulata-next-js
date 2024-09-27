"use client";

import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import logo from "../assests/Images/logo.jpg";
import Miniheader from "./Miniheader";
import HeaderCart from "./ui/HeaderCart";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Drawer, List } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "সকল পণ্য", value: "/sokol-ponno" },
  { name: "ফল গাছ", value: "/falgach" },
  { name: "ফুল গাছ", value: "/fulgach" },
  { name: "শোভাময়-গাছ", value: "/sovamoy" },
];

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleNavigate = (value) => {
    router.push(value);
    closeDrawer();
  };

  return (
    <nav className="bg-white nav fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center container py-3">
        <div className="md:hidden">
          <RxHamburgerMenu
            className="text-[2rem] cursor-pointer"
            onClick={showDrawer}
          />
        </div>
        <div>
          <Link href="/">
            <Image src={logo} alt="logo" width={120} height={120} />
          </Link>
        </div>
        <div className="items-center w-[60%] relative hidden md:flex">
          <input
            className="search-input w-full h-12 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:shadow-inner"
            type="text"
            id="searchbox"
            placeholder="What are you looking for?"
            name="search"
            autoComplete="off"
          />
          <button
            className="search-button h-12 px-4 bg-[#81D742] text-white rounded-r-md uppercase text-xs tracking-wide"
            type="submit"
          >
            <span>Search</span>
          </button>
        </div>
        <HeaderCart />
      </div>
      <div className="items-center w-[95%] mb-2 md:hidden mx-auto relative flex">
        <input
          className="search-input w-full h-12 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:shadow-inner"
          type="text"
          id="searchbox"
          placeholder="What are you looking for?"
          name="search"
          autoComplete="off"
        />
        <button
          className="search-button h-12 px-4 bg-[#81D742] text-white rounded-r-md uppercase text-xs tracking-wide"
          type="submit"
        >
          <span>Search</span>
        </button>
      </div>
      <Miniheader />

      <Drawer
        placement="left"
        onClose={closeDrawer}
        closeIcon={<CloseOutlined />}
        visible={drawerVisible}
        className="md:hidden"
        headerStyle={{ display: "flex", justifyContent: "flex-end" }}
      >
        <List
          dataSource={categories}
          renderItem={(item) => (
            <Link href={`${item.value}`}>
              <p className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-200 font-medium text-[#212b36] text-[1.1rem]">
                {item.name}
              </p>
            </Link>
          )}
        />
      </Drawer>
    </nav>
  );
};

export default Header;

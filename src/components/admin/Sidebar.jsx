"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../assests/Images/logo-green.png";

import { usePathname, useRouter } from "next/navigation";
import { sideBarItems } from "@/utils/sidebarItems";

import { Tooltip } from "antd";
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const active =
    " flex text-primary items-center px-4  py-4 bg-[#f1f9ff] rounded-[10px] transition-all duration-200";
  const deactive =
    " flex  items-center px-4  py-4  rounded-[12px] transition-all duration-200";

  return (
    <div className="bg-white shadow-md fixed  top-0 bottom-0">
      <div className="min-h-[100vh]  h-[100%]">
        <div
          onClick={() => router.push("/")}
          className="flex justify-center items-center mt-4 cursor-pointer"
        >
          <Image src={logo} alt="logo" width={40} height={40} />
        </div>

        <ul className="font-500 px-5 mt-6">
          {sideBarItems?.map((item, index) => (
            <li className={` mt-2 transition-all duration-200  `} key={index}>
              <Tooltip placement="left" title={item.tooltip}>
                <Link
                  className={` ${pathname === item.to ? active : deactive}`}
                  href={item.to}
                >
                  {/* <Tooltip style={{}} place="right" id={item.tooltip} /> */}
                  {item.icon}
                </Link>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

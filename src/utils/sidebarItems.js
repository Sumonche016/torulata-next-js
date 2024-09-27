// import { MdDashboard } from "react-icons/Md";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillPCircleFill } from "react-icons/bs";
import { BsDisplay } from "react-icons/bs";
import { IoBagCheck } from "react-icons/io5";
export const sideBarItems = [
  {
    to: "/admin",
    icon: <MdDashboardCustomize className="text-[20px]  " />,
    tooltip: "Dashboard",
    posthogEvent: "Enter Dashboard Page",
    buttonName: "Dashboard in Sidebar",
  },
  {
    to: "/products",
    icon: <BsFillPCircleFill className=" text-[20px]" />,
    tooltip: "Product",
    posthogEvent: "Enter Sequence Page",
    buttonName: "Sequence in Sidebar",
  },
  {
    to: "/banner",
    icon: <BsDisplay className=" text-[20px]" />,
    tooltip: "Banner",
    posthogEvent: "Enter Prospect Page",
    buttonName: "Prospect in Sidebar",
  },
  {
    to: "/order",
    icon: <IoBagCheck className=" text-[20px]" />,
    tooltip: "Orders",
  },
];

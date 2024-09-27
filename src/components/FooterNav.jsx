"use client";
import { useState } from "react";
import { FaHome, FaPhoneSquareAlt } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { Modal, Button } from "antd";
import whatsapp from "../assests/Images/whatsapp.png";
import messenger from "../assests/Images/messnger.png";
import call from "../assests/Images/call.png";
import Image from "next/image";
import Link from "next/link";

const FooterNav = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const phoneNumber = "+8801711258558";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleMessengerClick = () => {
    // Replace 'YOUR_FACEBOOK_PAGE_ID' with your actual Facebook Page ID
    window.open("https://m.me/61561305989542", "_blank");
  };

  const handleDirectCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleCheckout = () => {
    // router.push("/checkout");
  };

  return (
    <>
      <div className="bg-primary text-white md:hidden py-[10px] fixed bottom-0 left-0 w-full z-[999] shadow-deep rounded-md">
        <div className="w-[95%] mx-auto">
          <ul className="flex justify-between items-center">
            <li className="flex flex-col justify-center items-center cursor-pointer">
              <FaHome />
              <h1 className="mt-2">Home</h1>
            </li>
            <li className="flex flex-col justify-center items-center">
              <BiSolidCategory />
              <h1 className="mt-2">Category</h1>
            </li>
            <Link href={"/checkout"}>
              <li className="flex flex-col justify-center items-center cursor-pointer">
                <FaBagShopping />
                <h1 className="mt-2">Cart</h1>
              </li>
            </Link>

            <li
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={showModal}
            >
              <FaPhoneSquareAlt />
              <h1 className="mt-2">Call now</h1>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        title="Contact Options"
        visible={isModalVisible}
        centered={true}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col space-y-4">
          <Button
            icon={
              <Image src={whatsapp} alt="whatsapp" width={30} height={30} />
            }
            size="large"
            onClick={handleWhatsAppClick}
          >
            WhatsApp Message
          </Button>
          <Button
            icon={
              <Image src={messenger} alt="whatsapp" width={30} height={30} />
            }
            size="large"
            onClick={handleMessengerClick}
          >
            Messenger
          </Button>
          <Button
            icon={<Image src={call} alt="whatsapp" width={30} height={30} />}
            size="large"
            onClick={handleDirectCallClick}
          >
            Direct Call
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FooterNav;

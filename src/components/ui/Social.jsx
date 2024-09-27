import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

const Social = () => {
  return (
    <div>
      <ul className="flex gap-2">
        <li className="cursor-pointer">
          {" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Oroonnonursery"
          >
            <FaFacebookF />
          </a>{" "}
        </li>
        <li className="cursor-pointer">
          {" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/"
          >
            <FaLinkedinIn />
          </a>
        </li>
        <li className="cursor-pointer">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/+8801711258558"
          >
            <BsWhatsapp className="" />
          </a>
        </li>
        <li className="cursor-pointer ">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/oroonnonursery?igsh=MTAxNGVleHhmZ3RnbA=="
          >
            <AiOutlineInstagram />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Social;

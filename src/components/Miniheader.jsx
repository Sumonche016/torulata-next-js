import { BsHeadset } from "react-icons/bs";

const Miniheader = () => {
  return (
    <div className="border-t border-borderPrimar w-full text-sm   hidden md:inline-block md:text-[1rem]">
      <div className="py-2 container flex justify-between items-center">
        <div>
          <ul className="flex items-center gap-4 text-[1.1rem]">
            <li>Home</li>
            <li>Contact</li>
            <li>Store</li>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <BsHeadset className="text-[2rem] text-cartColor" />
          <div>
            <h1 className="text-muted">Hotline</h1>
            <span>+8801711258558</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Miniheader;

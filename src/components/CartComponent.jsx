import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateRefetch } from "@/lib/ProductSlice/productSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { usePathname, useRouter } from "next/navigation";
const CartComponent = ({ setIsOpen }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const refetch = useAppSelector((state) => state.productSlice.refetch);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const calculatedTotalPrice = storedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(calculatedTotalPrice);
  }, [refetch]);

  const deleteCartItem = (id) => {
    const filterProduct = products.filter((product) => product._id !== id);
    setProducts(filterProduct);
    localStorage.setItem("products", JSON.stringify(filterProduct));
    updateTotalPrice(filterProduct);
    dispatch(updateRefetch());
  };

  const handleIncrementQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product._id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
            totalPrice: (product.quantity + 1) * product.price,
          }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    updateTotalPrice(updatedProducts);
    dispatch(updateRefetch());
  };

  const handleDecrementQuantity = (id) => {
    const updatedProducts = products.map((product) =>
      product._id === id && product.quantity > 1
        ? {
            ...product,
            quantity: product.quantity - 1,
            totalPrice: (product.quantity - 1) * product.price,
          }
        : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    updateTotalPrice(updatedProducts);
    dispatch(updateRefetch());
  };

  const updateTotalPrice = (products) => {
    const newTotalPrice = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };
  const pathname = usePathname();

  return (
    <div className="h-[80%] flex flex-col">
      <SimpleBar className="flex-grow custom-scroll">
        <div className="space-y-6 px-6">
          {products.length === 0 ? (
            <h1 className="text-xl text-red-700 font-semibold ">
              There is no prodcuts on the cart 😒
            </h1>
          ) : (
            products?.map((item) => (
              <div
                key={item?._id}
                className="flex items-center justify-between"
              >
                <div>
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>
                <div className="basis-[50%]">
                  <h1>{item?.name}</h1>
                  <p className="text-sm font-medium">
                    Unit Price: {item.price}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 mt-4">
                      <div
                        onClick={() => handleDecrementQuantity(item._id)}
                        className="bg-[#F5F5F5] p-2 rounded-md cursor-pointer"
                      >
                        <AiOutlineMinus />
                      </div>

                      <div className="font-semibold">{item.quantity}</div>

                      <div
                        onClick={() => handleIncrementQuantity(item._id)}
                        className="bg-[#F5F5F5] p-2 rounded-md cursor-pointer"
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold">{item.totalPrice}</h1>
                      <div className="hidden opacity-0">{totalPrice}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => deleteCartItem(item._id)}
                    className="bg-[#e3e2e2] p-2 rounded-md cursor-pointer"
                  >
                    <MdDelete className="text-xl text-red-500 " />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SimpleBar>

      <div
        className={`${
          pathname.includes("checkout") ? "hidden" : "flex"
        } justify-center w-full shadow-md px-3 mt-4 md:mt-8`}
      >
        <div
          onClick={() => {
            router.push("/checkout");
            setIsOpen(false);
          }}
          className="md:bg-primary bg-[#059669] cursor-pointer rounded-md text-white w-full p-3 mx-auto"
        >
          <div className="flex justify-between items-center w-full">
            <p className="font-medium text-[1.1rem]">Proceed To Checkout</p>
            <div className="bg-white rounded-md py-2 px-3 text-black font-semibold text-[1.2rem]">
              ৳ {totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;

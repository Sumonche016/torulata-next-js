import { getSingleOrder } from "@/lib/getSingleOrder";
import OrderDetails from "./OrderDetails";
import { fetchAllOrder } from "../../page";

const page = async ({ params }) => {
  const { orderId } = params;

  let order = await getSingleOrder(orderId);

  return (
    <div>
      <OrderDetails singleOrderData={order.data} />
    </div>
  );
};

export default page;

export async function generateStaticParams() {
  const orders = await fetchAllOrder();

  return orders.data.map((product) => ({
    orderId: product._id.toString(),
  }));
}

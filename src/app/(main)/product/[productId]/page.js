import { getAllProducts } from "@/lib/getAllProducts";
import { getSingleproduct } from "@/lib/getSingleProduct";
import SingleProductCard from "../singleProductCard";

export async function generateMetadata({ params }) {
  const { productId } = params;
  let product = await getSingleproduct(productId);

  return {
    title: product.data.product_title,
    description: product.data.product_info.product_details,
  };
}
const page = async ({ params }) => {
  const { productId } = params;
  let product = await getSingleproduct(productId);

  return (
    <div className="pt-[10rem]">
      <SingleProductCard product={product} />
    </div>
  );
};

export default page;

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.data.map((product) => ({
    productId: product._id.toString(),
  }));
}

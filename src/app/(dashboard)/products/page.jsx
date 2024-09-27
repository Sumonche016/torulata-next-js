import AddProductDrawer from "./AddProductDrawer";
import ProductsTable from "./ProductsTable";

async function fetchAllProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/fetchProducts`,
    {
      next: {
        tags: ["allProducts"],
      },
      cache: "no-store",
    }
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Page = async () => {
  const result = await fetchAllProducts();

  let products = result.data.map((product) => ({
    key: product._id,
    name: product.product_title,
    price: product.product_price,
    image: product.product_images,
  }));

  return (
    <div className="w-full">
      <AddProductDrawer />
      <ProductsTable products={products} />
    </div>
  );
};

export default Page;

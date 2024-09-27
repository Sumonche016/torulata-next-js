export async function getAllProducts(payload) {
  console.log(payload);
  let category = payload?.category ? payload.category : "";
  let limit = payload?.limit ? payload.limit : 20;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/findByProductCategory?category=${category}&limit=${limit}&skip=0`,
    {
      next: {
        tags: ["allProducts"],
      },
      cache: "no-store",
    }
  );

  console.log(
    `${
      process.env.NEXT_PUBLIC_SEVER_API
    }/api/v1/product/findByProductCategory?category=${category}&limit=20&skip=${0}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

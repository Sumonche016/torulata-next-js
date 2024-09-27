export async function getSingleproduct(id) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/singleProduct/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

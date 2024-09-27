export async function getProductsById(data) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/findManyById/${data}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

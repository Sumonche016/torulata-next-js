export async function getSingleOrder(id) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_SEVER_API}/odder/singleOrder/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

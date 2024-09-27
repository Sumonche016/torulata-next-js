import AllOrder from "./AllOrder";

export async function fetchAllOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SEVER_API}/odder`, {
    cache: "no-store",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  let orders = await fetchAllOrder();

  return (
    <div>
      <AllOrder allOderData={orders} />
    </div>
  );
};

export default page;

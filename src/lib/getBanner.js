export async function getAllbanner() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SEVER_API}/banner`, {
    next: { tags: ["banner"] },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

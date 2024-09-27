import dynamic from "next/dynamic";

const EditProduct = dynamic(() => import("./EditProduct"), { ssr: false });

const page = async ({ params }) => {
  const { editId } = params;
  return (
    <div>
      <EditProduct productId={editId} />
    </div>
  );
};

export default page;

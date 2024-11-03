"use client";
import { useState } from "react";
import Image from "next/image";
import { Table, Button, Space, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { customRevalidateTag } from "@/lib/customRevalidate";
import { useRouter } from "next/navigation";
const ProductsTable = ({ products }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (id) => {
    router.push(`/products/edit/${id}`);
  };

  const showDeleteModal = (id) => {
    setDeletingProductId(id);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/deleteProduct/${deletingProductId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Product deleted successfully");
        customRevalidateTag("allProducts");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "30%",
      render: (image) => (
        <Image
          src={image}
          alt="Product"
          width={80}
          height={80}
          className="rounded-md"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => showDeleteModal(record.key)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <Input.Search
        placeholder="Search products by name"
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 max-w-md"
        allowClear
      />
      <Table dataSource={filteredProducts} columns={columns} />
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-emerald-500",
          loading: isDeleting,
        }}
        cancelButtonProps={{
          className: "hover:bg-gray-100",
        }}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default ProductsTable;

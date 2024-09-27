"use client";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-hot-toast";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { getSingleproduct } from "@/lib/getSingleProduct";
import { useEffect, useState } from "react";
import BasicInformation from "../../BasicInformation";
import Priceing from "../../Priceing";
import Images from "../../Images";
import Tags from "../../Tags";
import { category } from "../../TagOption";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { customRevalidateTag } from "@/lib/customRevalidate";
import { FaSave, FaSpinner } from "react-icons/fa";

const animatedComponents = makeAnimated();

const EditProduct = ({ productId }) => {
  const { register, handleSubmit, reset } = useForm();
  const [englishTag, setEnglishTags] = useState([]);
  const [banglaTags, setBanglaTags] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const [priority, setPriority] = useState(null);
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [productCare, setProductCare] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategory, setselectedCategory] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await getSingleproduct(productId);
        if (response.success) {
          console.log("singleproduct", response.data);
          setSingleProduct(response.data);

          reset({
            producTtitle: response.data.product_title,
            Product_Price: response.data.product_price,
            Discount: response.data.product_discount,
          });

          setDescription(response?.data?.product_info.product_details);
          const contentBlock = htmlToDraft(
            response?.data?.product_info.product_details
          );
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
          }
          setProductCare(response.data.product_info.product_care);
          setBanglaTags(response.data.product_tags_bangla);
          setEnglishTags(response.data.product_tags_english);
          setselectedCategory(response.data.product_category);
          setImageUrl(response.data.product_images);
          setPriority(response.data.product_info.priority);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [productId, reset]);

  const handleMultiselect = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setselectedCategory(values);
  };

  const handleImage = async (event) => {
    const url = `https://api.imgbb.com/1/upload?key=3d10492adfa8561b3f13d1051a54448e`;

    const imageFormData = new FormData();
    imageFormData.append("image", event.target.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const imgData = JSON.parse(xhr.responseText);
        setImageUrl(imgData.data.url);
      }
    };
    xhr.send(imageFormData);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      const payload = {
        product_title: data.producTtitle,
        product_price: data.Product_Price,
        product_discount: data.Discount,
        product_info: {
          product_care: productCare,
          product_details: html,
          priority: Number(priority),
        },
        product_images: imageUrl,
        product_category: selectedCategory,
        product_tags_english: englishTag,
        product_tags_bangla: banglaTags,
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/updateProduct/${productId}`,
        payload
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        customRevalidateTag("allProducts");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-[1.75rem] font-medium">Edit Product</h1>
          <h1
            onClick={() => router.push(`/products`)}
            className="flex gap-2 items-center font-medium cursor-pointer"
          >
            <IoIosArrowBack />
            Back
          </h1>
        </div>

        <form
          id="editProduct"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4"
        >
          <div>
            <div className="grid gird-cols-1 md:grid-cols-5 gap-0 md:gap-6">
              <div className="col-span-3 ">
                <BasicInformation
                  onEditorStateChange={onEditorStateChange}
                  editorState={editorState}
                  register={register}
                  description={description}
                  setDescription={setDescription}
                />
                <Priceing register={register} />
                <Images
                  uploadProgress={uploadProgress}
                  imageUrl={imageUrl}
                  handleImage={handleImage}
                  setImageUrl={setImageUrl}
                />
                <div className="product-care bg-white shadow-light p-5 mt-6">
                  <h1 className="text-[1.125rem] font-medium mb-5 ">
                    Product Care
                  </h1>
                  <textarea
                    defaultValue={productCare}
                    onChange={(e) => setProductCare(e.target.value)}
                    className="border-input border  text-[15px] font-medium w-full form-control pl-1"
                    name=""
                    id=""
                    cols="30"
                    rows="7"
                  ></textarea>
                </div>
              </div>

              <div className="col-span-2 text-[15px] font-medium">
                <Tags
                  setBanglaTags={setBanglaTags}
                  englishTag={englishTag}
                  setEnglishTags={setEnglishTags}
                  banglaTags={banglaTags}
                />
                <div className="bg-white shadow-light p-5 mt-6">
                  <h1 className="text-[1.125rem] font-medium mb-5 ">
                    Category
                  </h1>

                  <div className="text-[15px] font-medium">
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={selectedCategory.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={handleMultiselect}
                      options={category}
                      isMulti
                    />
                  </div>
                  <div className="mt-4">
                    <h1 className="text-[1.125rem] font-medium mb-5 ">
                      Priority
                    </h1>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3].map((option) => (
                        <input
                          key={option}
                          type="button"
                          value={option}
                          onClick={() => setPriority(option)}
                          className={`border border-input rounded-md cursor-pointer font-medium focus:border-primary-green focus:outline-none px-3 py-2 ${
                            priority === option
                              ? "bg-primary text-white"
                              : "bg-white"
                          } transition-colors duration-200`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex mt-6">
                  <button
                    form="editProduct"
                    className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-3 rounded-md text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <FaSpinner className="animate-spin mr-2" />
                    ) : (
                      <FaSave className="mr-2" />
                    )}
                    {submitting ? "Updating..." : "Update Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

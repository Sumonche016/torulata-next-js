"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import { category } from "./TagOption";
import BasicInformation from "./BasicInformation";
import Priceing from "./Priceing";
import Images from "./Images";
import Tags from "./Tags";
import makeAnimated from "react-select/animated";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FaSave, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { customRevalidateTag } from "@/lib/customRevalidate";
import toast from "react-hot-toast";

const animatedComponents = makeAnimated();

const AddProduct = () => {
  const [englishTag, setEnglishTags] = useState([]);
  const [banglaTags, setBanglaTags] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [description, setDescription] = useState("");
  const [productCare, setProductCare] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [priority, setPriority] = useState(null);
  const [badge, setBadge] = useState("");
  const [selectedCategory, setselectedCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const productNameRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

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
    setIsSubmitting(true);
    try {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const payload = {
        product_title: data.producTtitle,
        product_price: data.Product_Price,
        product_discount: data.Discount,
        product_info: {
          product_details: html,
          product_care: productCare,
          priority: Number(priority),
        },
        product_images: imageUrl,
        product_category: selectedCategory,
        product_tags_english: englishTag,
        product_tags_bangla: banglaTags,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SEVER_API}/api/v1/product/addProduct`,
        payload
      );

      if (response.data.success) {
        console.log(response.data);
        reset();
        setImageUrl(null);
        setEditorState(EditorState.createEmpty());
        setLoader(false);
        toast.success("Product Added");

        customRevalidateTag("allProducts");
        setPriority(null);
        setBanglaTags([]);
        setEnglishTags([]);
        setselectedCategory([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-4">
      <form
        id="addProduct"
        onSubmit={handleSubmit(onSubmit)}
        action={onSubmit}
        className="mt-4"
      >
        <div>
          <div className="grid gird-cols-1 md:grid-cols-5 gap-0 md:gap-6">
            <div className="col-span-3 ">
              <BasicInformation
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
                register={register}
                setDescription={setDescription}
                description={description}
              />
              <Priceing register={register} />
              <Images
                uploadProgress={uploadProgress}
                imageUrl={imageUrl}
                handleImage={handleImage}
                setImageUrl={setImageUrl}
              />
              <div className="product-care bg-white border-primary rounded-[10px] p-5 mt-6">
                <h1 className="text-[1.125rem] font-medium mb-5">
                  Product Care:
                </h1>
                <textarea
                  value={productCare}
                  onChange={(e) => setProductCare(e.target.value)}
                  className="border-gray-200 border text-[15px] focus:outline-gray-200 font-medium w-full pl-1"
                  name=""
                  id=""
                  cols="30"
                  rows="7"
                ></textarea>
              </div>
            </div>
            <div className="col-span-2 ">
              <Tags
                setBanglaTags={setBanglaTags}
                englishTag={englishTag}
                setEnglishTags={setEnglishTags}
                banglaTags={banglaTags}
              />
              <div className="bg-white border-primary rounded-[10px] p-5 mt-6">
                <h1 className="text-[1.125rem] font-medium mb-5">Category</h1>
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
                  <h1 className="text-[1.125rem] font-medium mb-5">Priority</h1>
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
              <div className="flex mt-4">
                <button
                  form="addProduct"
                  className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-3 rounded-md text-sm text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

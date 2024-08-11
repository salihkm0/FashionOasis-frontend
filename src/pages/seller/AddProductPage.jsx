import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import CircularProgress from "@mui/material/CircularProgress";

export const AddProductPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  const { control, register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      sku: "",
      name: "",
      price: "",
      description: "",
      brand: "",
      sizes: [{ size: "", quantity: "" }],
      category: "",
      subCategory: "",
      subSubCategory: "",
      isOffer: false,
      offer: { type: "", value: "" },
      imageUrls: [],
      taxRate: "",
      isTaxable: false,
      isFeatured: false,
      seller: user._id,
      color: "",
    },
  });

  const { fields: sizeFields, append: sizeAppend } = useFieldArray({
    control,
    name: "sizes",
  });

  const onDrop = (acceptedFiles) => {
    setImageFiles([...imageFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("data :", data);
    const formData = new FormData();

    // Append other data
    for (const key in data) {
      if (key === "sizes" || key === "offer") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }

    // Append image files
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    console.log("formData :", formData);
    try {
      const response = await axios.post(
        "https://fashionoasis-backend.onrender.com/api/v1/product/add",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        reset();
        setImageFiles([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("There was an error adding the product!", error);
      toast.error("There was an error adding the product!");
      setLoading(false);
    }
  };

  const isOffer = watch("isOffer");
  const isTaxable = watch("isTaxable");
  const isFeatured = watch("isFeatured");

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-600 text-2xl font-bold">Add Product</h6>
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 mt-[40px]">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                {user && (
                  <div className="w-full px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        seller
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("seller")}
                        defaultValue={user._id}
                        disabled
                      />
                    </div>
                  </div>
                )}

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      sku
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("sku")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("name")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      brand
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("brand")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      price
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("price")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      color
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("color")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("category")}
                    >
                      <option value="">Select</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subCategory")}
                    >
                      <option value="">Select</option>
                      <option value="tops">Tops</option>
                      <option value="bottoms">Bottoms</option>
                      <option value="suits">Suits</option>
                      <option value="activewear">Activewear</option>
                      <option value="accessories">Accessories</option>
                      <option value="footwear">Footwear</option>
                      <option value="outerwear">Outerwear</option>
                      <option value="footwear">Footwear</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub Sub category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subSubCategory")}
                    >
                      <option value="">Select</option>
                      <option value="tshirts">T-shirts</option>
                      <option value="shirts">Shirts</option>
                      <option value="blouses">Blouses</option>
                      <option value="jeans">Jeans</option>
                      <option value="trousers">Trousers</option>
                      <option value="shorts">Shorts</option>
                      <option value="leggings">Leggings</option>
                      <option value="socks">Socks</option>
                      <option value="jackets">Jackets</option>
                      <option value="coats">Coats</option>
                    </select>
                  </div>
                </div>
              </div>

              {sizeFields.map((item, index) => (
                <div className="flex flex-wrap items-center mt-5">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Size
                      </label>
                      {/* <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register(`sizes.${index}.size`)}
                      /> */}
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register(`sizes.${index}.size`)}
                      >
                        <option className="uppercase" value="">
                          Select
                        </option>
                        <option className="uppercase" value="xs">
                          xs
                        </option>
                        <option className="uppercase" value="s">
                          s
                        </option>
                        <option className="uppercase" value="m">
                          m
                        </option>
                        <option className="uppercase" value="l">
                          l
                        </option>
                        <option className="uppercase" value="xl">
                          xl
                        </option>
                        <option className="uppercase" value="2xl">
                          2xl
                        </option>
                        <option className="uppercase" value="3xl">
                          3xl
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        quantity
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register(`sizes.${index}.quantity`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full px-4 mb-5">
                <div className="relative w-full mb-3">
                  <button
                    type="button"
                    className=" border-0 px-3 py-3 placeholder-blueGray-300 block uppercase text-xs font-bold text-white rounded text-sm shadow focus:outline-none focus:ring  ease-linear transition-all duration-150 mt-6 bg-green-500"
                    onClick={() => sizeAppend({ size: "", quantity: "" })}
                  >
                    add size
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Is Offer
                    </label>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blueGray-600"
                      {...register("isOffer")}
                    />
                  </div>
                </div>
                {isOffer && (
                  <>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Offer Type
                        </label>
                        <select
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("offer.type")}
                        >
                          <option value="">Select</option>
                          <option value="percentage">Percentage</option>
                          <option value="amount">Amount</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Offer Value
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("offer.value")}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Is Taxable
                    </label>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blueGray-600"
                      {...register("isTaxable")}
                    />
                  </div>
                </div>
                {isTaxable && (
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Tax Rate
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        {...register("taxRate")}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Is Featured
                    </label>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blueGray-600"
                      {...register("isFeatured")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("description")}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="flex flex-wrap mt-5">
                <div className="w-full px-4 ">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Images
                    </label>
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <div className="flex flex-col gap-2 items-center	justify-center border-0 px-3 py-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <img
                          className="w-[100px] h-auto"
                          src="https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg"
                          alt=""
                        />
                        <p className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Drag & drop product images here, or click to select
                          images
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex  flex-wrap gap-y-2  items-center justify-start mt-5 h-auto p-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="w-full flex  lg:w-3/12 px-4">
                    <div className="relative w-full mb-3">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-auto h-[140px] rounded"
                      />
                      <button
                        type="button"
                        className="mt-2 bg-red-500 text-white font-bold py-1 px-3 rounded"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={"10px"}
                marginTop={"20px"}
                marginBottom={"20px"}
              >
                <div className="w-auto px-4">
                  <div className="relative w-full mb-3 ">
                    <button
                      type="submit"
                      className="px-10 border-0 px-3 py-3 placeholder-blueGray-300 block uppercase text-xs font-bold text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-6 bg-green-500 h-[42px]"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span>Adding...</span>
                          <CircularProgress size={"30px"} color="success" />
                        </>
                      ) : (
                        "Add Product"
                      )}
                    </button>
                  </div>
                </div>
                <div className="w-auto px-4">
                  <div className="relative w-full mb-3 ">
                    <button
                      type="reset"
                      className="px-10 border-0 px-3 py-3 placeholder-blueGray-300 block uppercase text-xs font-bold text-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-6 bg-red-500"
                    >
                      clear
                    </button>
                  </div>
                </div>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

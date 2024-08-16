import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

export const UpdateProductPage = () => {
  const { productId } = useParams();
  const { user} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const { control, register, handleSubmit, reset, watch, setValue } = useForm({
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
      // seller: user._id,
      color: "",
    },
  });

  const { fields: sizeFields, append: sizeAppend } = useFieldArray({
    control,
    name: "sizes",
  });

  useEffect(() => {
    // Fetch the existing product data
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://fashionoasis-backend.onrender.com/api/v1/product/update/${productId}`,{
          withCredentials : true
        });
        console.log(response.data)
        setProductData(response.data.updatedProduct);
        reset(response.data.updatedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId, reset]);

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

    try {
      const response = await axios.put(
        `https://fashionoasis-backend.onrender.com/api/v1/product/update/${productId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        setImageFiles([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("There was an error updating the product!", error);
      toast.error("There was an error updating the product!");
      setLoading(false);
    }
  };

  const isOffer = watch("isOffer");
  const isTaxable = watch("isTaxable");
  const isFeatured = watch("isFeatured");

  if (!productData) {
    return <CircularProgress />;
  }

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-600 text-2xl font-bold">Update Product</h6>
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
                        htmlFor="grid-password"
                      >
                        Seller
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

                {/* Other input fields */}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      SKU
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
                      Name
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
                      Brand
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
                      Price
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
                      Color
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
                      Category
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("category")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      SubCategory
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subCategory")}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub-SubCategory
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subSubCategory")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("description")}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Offer Section */}
              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        {...register("isOffer")}
                      />
                      <label className="ml-2 block text-sm leading-5 font-medium text-gray-700">
                        Offer
                      </label>
                    </div>
                    {isOffer && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Offer Type
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("offer.type")}
                          />
                        </div>
                        <div>
                          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                            Offer Value
                          </label>
                          <input
                            type="number"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("offer.value")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="w-full lg:w-12/12 px-4 mt-5">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Images
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 p-4 rounded-md"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-500">
                      Drag & drop some files here, or click to select files
                    </p>
                  </div>
                  <div className="mt-4">
                    {imageFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mb-2"
                      >
                        <p className="text-gray-700">{file.name}</p>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

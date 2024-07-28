import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";

export const UpdateProductPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

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
      seller: "",
    },
  });

  const { fields: sizeFields, append: sizeAppend } = useFieldArray({
    control,
    name: "sizes",
  });

  const { id: productId } = useParams();

  useEffect(() => {
    // Fetch the existing product data
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/v1/product/${productId}`
        );
        const product = response.data.product;
        for (const key in product) {
          if (key === "sizes") {
            product.sizes.forEach((size, index) => {
              sizeAppend(size);
            });
          } else {
            setValue(key, product[key]);
          }
        }
        setExistingImages(product.imageUrls || []);
      } catch (error) {
        console.error("There was an error fetching the product data!", error);
      }
    };

    fetchProduct();
  }, [productId, setValue, sizeAppend]);

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

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
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

    // Append existing images
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const response = await axios.put(
        `http://localhost:5555/api/v1/product/update/${productId}`,
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
        reset();
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
                        value={user.name ? user.name : user.firstName}
                        disabled
                      />
                    </div>
                  </div>
                )}

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
              </div>
              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("category")}
                    >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub Category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subCategory")}
                    >
                      <option value="clothing">Clothing</option>
                      <option value="shoes">Shoes</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Sub-Sub Category
                    </label>
                    <select
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("subSubCategory")}
                    >
                      <option value="topwear">Topwear</option>
                      <option value="bottomwear">Bottomwear</option>
                      <option value="watches">Watches</option>
                    </select>
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
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="4"
                      {...register("description")}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-6/12 px-4">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Sizes and Quantity
                  </label>
                  {sizeFields.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="w-6/12">
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Size"
                          {...register(`sizes.${index}.size`)}
                        />
                      </div>
                      <div className="w-6/12">
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Quantity"
                          {...register(`sizes.${index}.quantity`)}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => sizeAppend({ size: "", quantity: "" })}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Size
                  </button>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Offer
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        {...register("isOffer")}
                      />
                      <span className="ml-2 text-gray-700">Offer</span>
                    </label>
                  </div>
                  {isOffer && (
                    <div className="flex flex-wrap">
                      <div className="w-6/12">
                        <select
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("offer.type")}
                        >
                          <option value="percentage">Percentage</option>
                          <option value="flat">Flat</option>
                        </select>
                      </div>
                      <div className="w-6/12">
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("offer.value")}
                          placeholder="Value"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap mt-5">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Tax
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        {...register("isTaxable")}
                      />
                      <span className="ml-2 text-gray-700">Taxable</span>
                    </label>
                  </div>
                  {isTaxable && (
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                          Tax Rate
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          {...register("taxRate")}
                          placeholder="Enter Tax Rate"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap mt-5">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Featured
                    </label>
                    <label className="inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        {...register("isFeatured")}
                      />
                      <span className="ml-2 text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap mt-5">
                <div className="w-full px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Product Images
                    </label>
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-blue-500 py-10 flex flex-col items-center justify-center"
                    >
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <div className="flex flex-wrap mt-4">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="w-1/4 px-2">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Product preview ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded mt-2 w-full"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {existingImages.map((url, index) => (
                        <div key={index} className="w-1/4 px-2">
                          <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded mt-2 w-full"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Stack
                alignItems="flex-end"
                marginBottom="10px"
                marginTop="20px"
              >
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </Stack>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};


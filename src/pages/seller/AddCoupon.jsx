import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const schema = yup.object().shape({
  code: yup.string().required("Coupon code is required"),
  discountType: yup
    .string()
    .oneOf(["percentage", "fixed"], "Select a valid discount type")
    .required("Discount type is required"),
  discountValue: yup
    .number()
    .positive("Value must be a positive number")
    .required("Discount value is required"),
  expirationDate: yup.date().nullable(),
  usageLimit: yup
    .number()
    .positive("Value must be a positive number")
    .required("Discount value is required"),
});

export const AddCoupon = ({ editMode, couponId }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && couponId) {
      setLoading(true);
      axios
        .get(`https://fashionoasis-backend.onrender.com/api/v1/coupon/${couponId}`)
        .then((res) => {
          const { code, discountType, discountValue, expirationDate, usageLimit } = res.data.coupon;
          console.log(res.data.coupon);
          setValue("code", code);
          setValue("discountType", discountType);
          setValue("discountValue", discountValue);
          setValue("expirationDate", expirationDate ? new Date(expirationDate).toISOString().substr(0, 10) : "");
          setValue("usageLimit", usageLimit);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      reset();
    }
  }, [editMode, couponId, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (editMode && couponId) {
        res = await axios.put(`https://fashionoasis-backend.onrender.com/api/v1/coupon/update/${couponId}`, data, {
          withCredentials: true,
        });
      } else {
        res = await axios.post("https://fashionoasis-backend.onrender.com/api/v1/coupon/add", data, {
          withCredentials: true,
        });
      }

      if (!res.data.success) {
        return toast.error("Operation failed");
      }
      toast.success(`Coupon ${editMode ? "Updated" : "Added"} Successfully`);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            {...register("code")}
            className={`w-full px-3 py-2 border rounded uppercase ${
              errors.code ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.code && (
            <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Type
          </label>
          <select
            {...register("discountType")}
            className={`w-full px-3 py-2 border rounded ${
              errors.discountType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          {errors.discountType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discountType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount Value
          </label>
          <input
            type="number"
            {...register("discountValue")}
            className={`w-full px-3 py-2 border rounded ${
              errors.discountValue ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.discountValue && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discountValue.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            {...register("expirationDate")}
            className={`w-full px-3 py-2 border rounded ${
              errors.expirationDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.expirationDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.expirationDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usage Limit
          </label>
          <input
            type="number"
            {...register("usageLimit")}
            className={`w-full px-3 py-2 border rounded ${
              errors.usageLimit ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.usageLimit && (
            <p className="text-red-500 text-xs mt-1">
              {errors.usageLimit.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editMode ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>
    </>
  );
};

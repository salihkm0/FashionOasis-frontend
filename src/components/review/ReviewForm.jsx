import React from "react";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddReview = ({ productId, onReviewSubmit }) => {
    const { user, status } = useSelector((state) => state.auth);
  const { register, handleSubmit, setValue, watch } = useForm();
  const rating = watch("rating");
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const requestData = {
        ...data,
        userImage: user.imageUrl,
        userName: user.name,
      };

      const res = await axios.post(
        `http://localhost:5555/api/v1/my-reviews/add/${productId}`,
        requestData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // onReviewSubmit(); // Trigger the callback to refresh reviews
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting the review.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="mt-3">
        <Rating
          name="half-rating"
          precision={0.5}
          value={rating}
          onChange={(event, newValue) => setValue("rating", newValue)}
          size={"large"}
          sx={{
            fontSize: "3rem",
          }}
        />
      </div>
      <div className="mt-3 border-none w-full">
        <textarea
          {...register("review")}
          placeholder="Write your review here"
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        className="bg-green-500 p-3 text-white rounded-md mt-3"
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
};
export default AddReview;

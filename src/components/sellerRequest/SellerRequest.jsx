import React from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";

const SellerRequestButton = () => {
  const handleRequest = async () => {
    console.log("Seller request submitted");
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/seller-request",
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Seller request submitted successfully");
      } else {
        toast.error("Error submitting seller request");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error, please try again later");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleRequest}>
      Request to Become a Seller
    </Button>
  );
};

export default SellerRequestButton;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { formatDate } from "../../utils/formateDate";
import { AddCoupon } from "../seller/AddCoupon.jsx";

import {
  AddBtn,
  ListBtn,
  ListBtnWrapper,
  ListPageBarWrpper,
  ListPageHead,
  ListTable,
  ListWrapper,
} from "../../styles/ListStyle.jsx";
import { toast } from "react-hot-toast";

Modal.setAppElement("#root");

export const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [couponId, setCouponId] = useState();
  const [loading, setLoading] = useState(false);

  const updateCoupon = (id) => {
    setEditMode(true);
    setCouponId(id);
    setModalIsOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditMode(false);
  };

  const getCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:5555/api/v1/coupon/all", {
        withCredentials: true,
      });
      // console.log(res)
      setCoupons(res.data.coupons);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDlelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5555/api/v1/coupon/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Coupon Successfully Deleted");
        getCoupons();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfExpired = (expirationDate) => {
    return new Date(expirationDate) < new Date();
  };

  useEffect(() => {
    getCoupons();
  }, [coupons]);

  //   console.log(coupons);
  return (
    <div className="mt-[50px] px-[30px]">
      <div>
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            <ListPageBarWrpper>
              <h2 className="text-2xl font-bold">Coupon List</h2>
              <AddBtn
                onClick={openModal}
                // className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Coupon
              </AddBtn>
            </ListPageBarWrpper>
            <ListWrapper>
              <ListTable>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Expiry Date</th>
                    <th>Usage Limit</th>
                    <th>Used</th>
                    <th>Status</th>
                    <th scope="col">Edit/Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.discountType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.discountValue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(coupon.expirationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.usageLimit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {coupon.used}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {checkIfExpired(coupon.expirationDate) ? (
                          <p className="text-red-500">Expired</p>
                        ) : (
                          <p className="text-green-600">Active</p>
                        )}
                      </td>
                      <td>
                        <ListBtnWrapper>
                          <ListBtn
                            $orange
                            type="button"
                            class="btn btn-primary "
                            onClick={() => updateCoupon(coupon._id)}
                          >
                            Edit
                          </ListBtn>
                          <ListBtn
                            $red
                            type="button"
                            class="btn btn-primary"
                            onClick={() => handleDlelete(coupon._id)}
                          >
                            Delete
                          </ListBtn>
                        </ListBtnWrapper>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </ListTable>
            </ListWrapper>
          </>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Coupon</h2>
          <AddCoupon editMode={editMode} couponId={couponId} />
          <button
            onClick={closeModal}
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

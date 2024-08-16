// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice";
import SellerRequestButton from "../sellerRequest/SellerRequest";
import axios from "axios";
// import { fetchCurrentUser } from '../../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    addressLine1: "",
    addressLine2 : "" ,
    landmark : "",
    city: "",
    district : "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (status === "idle") {
      // dispatch(fetchCurrentUser());
      dispatch(fetchUserProfile());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loading />;
    // return <div>Loading...</div>;
  }
  // console.log(user);

  useEffect(() => {
    // Fetch addresses on mount
    axios
      .get("http://localhost:5555/api/v1/address",{
        withCredentials: true,
      })
      .then((response) => setAddresses(response.data.Addresses))
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const handleOpen = (address = null) => {
    if (address) {
      setIsEditMode(true);
      setCurrentAddress(address);
    } else {
      setIsEditMode(false);
      setCurrentAddress({
        addressLine1: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCurrentAddress({ ...currentAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEditMode) {
      // Update address
      axios
        .put(
          `http://localhost:5555/api/v1/address/update/${currentAddress._id}`,
          currentAddress,{
            withCredentials: true,
          }
        )
        .then(() => {
          setAddresses(
            addresses.map((addr) =>
              addr._id === currentAddress._id ? currentAddress : addr
            )
          );
          handleClose();
        })
        .catch((error) => console.error("Error updating address:", error));
    } else {
      // Add new address
      axios
        .post("http://localhost:5555/api/v1/address/add", currentAddress,{
          withCredentials: true,
        })
        .then((response) => {
          setAddresses([...addresses, response.data.Addresses]);
          handleClose();
        })
        .catch((error) => console.error("Error adding address:", error));
    }
  };

  const handleDelete = (addressId) => {
    axios
      .delete(`http://localhost:5555/api/v1/address/delete/${addressId}`,{
        withCredentials: true,
      })
      .then(() => {
        setAddresses(addresses.filter((addr) => addr._id !== addressId));
      })
      .catch((error) => console.error("Error deleting address:", error));
  };
  return user ? (
    <>
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  My account
                </h6>
                {/* <button
                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Settings
                </button> */}
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        User name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.name ? user.name : user.firstName}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.email}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.name ? user.name : user.firstName}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.lastName ? user.lastName : null}
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                {/* <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        City
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="New York"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="United States"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="Postal Code"
                      />
                    </div>
                  </div>
                </div> */}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  About Me
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        About me
                      </label>
                      <textarea
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        rows={4}
                        defaultValue={
                          " A beautiful UI Kit and Admin for JavaScript & Tailwind CSS. It is Freeand Open Source."
                        }
                      />
                    </div>
                  </div>
                </div> */}
                <div>
                  <h2>Addresses</h2>
                  {addresses ? addresses.map((address) => (
                    <div key={address._id} className="my-3 p-3 shadow-lg rounded border flex flex-wrap gap-3">
                      {/* <p>
                        {address.addressLine1 ? address.addressLine1 : "" },
                        {address.addressLine2 ? address.addressLine2 : "" },
                        {address.landmark},
                        {address.city},
                        {address.district},
                        {address.state},
                        {address.postalCode}
                      </p> */}
                      <p className="py-1 text-md text-gray-600">
                      {address.addressLine1 ? address.addressLine1 : "" },
                      </p>
                      <p className="py-1 text-md text-gray-600">
                      {address.addressLine2 ? address.addressLine2 : "" },
                      </p>

                      <p className="py-1 text-md text-gray-600">
                      {address.landmark},
                      </p>
                      <p className="py-1 text-md text-gray-600">
                      {address.city},
                      </p>
                      <p className="py-1 text-md text-gray-600">
                      {address.district},
                      </p>
                      <p className="py-1 text-md text-gray-600">
                      {address.state},
                      </p>
                      <p className="py-1 text-md text-gray-600">
                      {address.postalCode}
                      </p>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(address)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(address._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )) : ""}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen()}
                    sx={{marginTop : "10px"}}
                  >
                    Add Address
                  </Button>

                  {/* Modal for Add/Edit Form */}
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={{ ...modalStyle }}>
                      <h2>{isEditMode ? "Update Address" : "Add Address"}</h2>
                      <TextField
                        label="Address Line 1"
                        name="addressLine1"
                        value={currentAddress.addressLine1}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Address Line 2"
                        name="addressLine2"
                        value={currentAddress.addressLine2}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Landmark"
                        name="landmark"
                        value={currentAddress.landmark}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="City"
                        name="city"
                        value={currentAddress.city}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="District"
                        name="district"
                        value={currentAddress.district}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="State"
                        name="state"
                        value={currentAddress.state}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        value={currentAddress.postalCode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                      >
                        {isEditMode ? "Update" : "Add"}
                      </Button>
                    </Box>
                  </Modal>
                </div>
              </form>
            </div>
          </div>
          {user.role === "customer" && (
            <div className="relative  pt-8 pb-6 mt-2">
              <SellerRequestButton />
            </div>
          )}

          <footer className="relative  pt-8 pb-6 mt-2">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  ) : (
    <p>No user is signed in</p>
  );
};




// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default Profile;

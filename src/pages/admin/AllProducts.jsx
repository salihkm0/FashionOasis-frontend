import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListBtn,
  ListBtnWrapper,
  ListPageBarWrpper,
  ListPageHead,
  ListTable,
  ListWrapper,
} from "../../styles/ListStyle";

export const AllProducts = () => {
  const [allProducts, setAllProducts] = useState({});

  const { products, productStatus, error } = useSelector(
    (state) => state.products
  );

  const handleSetProducts = () => {
    setAllProducts(products);
  };

  const handelProductDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5555/api/v1/product/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Product Successfully Deleted");
        handleSetProducts();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSetProducts();
  }, [allProducts, products]);

  return (
    <div className="mx-[5%] my-[50px]">
      <ListPageBarWrpper>
        <ListPageHead>Product List</ListPageHead>
        <Link
          to={"/products/add"}
          className="text-xl p-2 rounded-[4px] bg-green-500 text-white hover:bg-green-600"
        >
          Add Product
        </Link>
      </ListPageBarWrpper>
      <ListWrapper>
        <ListTable>
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Sizes</th>
              <th scope="col">Brand</th>
              <th scope="col">Price</th>
              <th scope="col">offerPrice</th>
              <th scope="col">isFeatured</th>
              <th scope="col">isTaxable</th>
              <th scope="col">Sold</th>
              <th scope="col">Category</th>
              <th scope="col">Seller</th>
              <th scope="col">Offer</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>
                  {prod.sizes &&
                    prod.sizes.map(
                      (size) => `${size.size} : ${size.quantity} , `
                    )}
                </td>
                <td>{prod.brand}</td>
                <td>{prod.price.toFixed(2)}</td>
                <td>{prod.offerPrice.toFixed(2)}</td>
                <td>{prod.isFeatured ? "Yes" : "No"}</td>
                <td>{prod.isTaxable ? "Yes" : "No"}</td>
                <td>{prod.sold}</td>
                <td>{prod.category}</td>
                <td></td>
                <td>
                  {prod.offer && `${prod.offer.type} : ${prod.offer.value}`}
                </td>
                <td>
                  <ListBtnWrapper>
                    <Link to={`/products/update/${prod._id}`}>
                      <ListBtn $orange type="button" class="btn btn-primary">
                        Edit
                      </ListBtn>
                    </Link>
                    <ListBtn
                      onClick={() => handelProductDelete(prod._id)}
                      $red
                      type="button"
                      class="btn btn-primary"
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
    </div>
  );
};

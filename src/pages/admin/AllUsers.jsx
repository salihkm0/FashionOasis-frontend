import axios from "axios";
import React, { useEffect, useState } from "react";
import FetchAllUsers from "../../components/fetchAllUsers/FetchAllUsers";

export const AllUsers = () => {
  return (
    <div className="p-10">
      <FetchAllUsers />
    </div>
  );
};

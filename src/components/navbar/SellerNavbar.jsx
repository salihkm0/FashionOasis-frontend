import { Link } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar.jsx";
import { useSelector } from "react-redux";
import GoogleLogoutButton from "../logoutButton/LogoutButton.jsx";

export const SellerNavbar = () => {
  const { user, status } = useSelector((state) => state.auth);

  // console.log("dfmewkmf", user)
  // navList Data
  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Seller Dashboard", to: "/seller/dashboard", current: false },
    { name: "Products", to: "/seller/products", current: false },
    // { name: "Users", to: "/se/users", current: false },
    // { name: "Orders", to: "/seller/Orders", current: false },
    { name: "Coupons", to: "/seller/coupons", current: false },
    
    // { name: "Admin Dashboard", to: "/admin/", current: false },
  ];
  return (
    <nav className="bg-orange-500 sticky top-0 z-50">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/seller/dashboard"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              FashionOasis
              <span className="ml-1 text-gray-700 text-[10px]">SELLER</span>
            </h2>
          </Link>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">
          {/* {navList} */}
          <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
            {user !== null && user._id ? (
              <li>
                <GoogleLogoutButton/>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        {/* Search Bar  */}
        {/* <Searchbar /> */}
      </div>
    </nav>
  );
};

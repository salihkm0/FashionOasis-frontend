import { Link } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar.jsx";
import { useSelector } from "react-redux";
import GoogleLogoutButton from "../logoutButton/LogoutButton.jsx";

export const Navbar = () => {
  const { user, status } = useSelector((state) => state.auth);

  // console.log("dfmewkmf", user)
  // navList Data
  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Shop", to: "/shop", current: false },
    { name: "About", to: "/about", current: false },
    { name: "Cart", to: "/user/cart", current: false },
    {
      name: `${user !== null && user._id ? "Profile" : "Login"}`,
      to: `${user !== null && user._id ? "/user/profile" : "/signin"}`,
      current: false,
    },

    // { name: "Admin Dashboard", to: "/admin/", current: false },
  ];
  return (
    <nav className="bg-orange-500 sticky top-0 z-50">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              FashionOasis
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
            <>
              {user !== null ? (
                <li>
                  <Link to={"/user/my-orders"}>My Orders</Link>
                </li>
              ) : null}
            </>
            <>
              {user !== null && user.role === "admin" ? (
                <li>
                  <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
                </li>
              ) : null}
            </>
            <>
              {user !== null && user.role === "seller" ? (
                <li>
                  <Link to={"/seller/dashboard"}>Seller Dashboard</Link>
                </li>
              ) : null}
            </>
            {user !== null && user._id ? (
              <li>
                <GoogleLogoutButton />
              </li>
            ) : null}
          </ul>
        </div>

        {/* Search Bar  */}
        <Searchbar />
      </div>
    </nav>
  );
};

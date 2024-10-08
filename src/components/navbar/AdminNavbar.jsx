import { Link } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar.jsx";
import { useSelector } from "react-redux";
import GoogleLogoutButton from "../logoutButton/LogoutButton.jsx";

export const AdminNavbar = () => {
  const { user, status } = useSelector((state) => state.auth);

  // console.log("dfmewkmf", user)
  // navList Data
  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Admin Dashboard", to: "/admin/dashboard", current: false },
    { name: "Products", to: "/admin/products", current: false },
    { name: "Users", to: "/admin/users", current: false },
    { name: "Orders", to: "/admin/Orders", current: false },
    { name: "Coupons", to: "/admin/coupons", current: false },
    
    // { name: "Admin Dashboard", to: "/admin/", current: false },
  ];
  return (
    <nav className="bg-orange-500 sticky top-0 z-50">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/admin/dashboard"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              FashionOasis
              <span className="ml-1 text-gray-700 text-[10px]">ADMIN</span>
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

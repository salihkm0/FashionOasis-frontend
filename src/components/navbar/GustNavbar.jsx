import { Link } from "react-router-dom";
import { Searchbar } from "../searchbar/Searchbar.jsx";

export const GustNavbar = () => {
  // navList Data
  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "Shop", to: "/shop", current: false },
    { name: "About", to: "/about", current: false },
    // { name: "Cart", to: "/cart", current: false },
    { name: "Logo", to: "/signin", current: false },
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
          </ul>
        </div>

        {/* Search Bar  */}
        <Searchbar />
      </div>
    </nav>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../../redux/cartSlice";
// productData

export const HomePageProductCard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity }));
  };
  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* main  */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap mx-4">
            {products.slice(0, 8).map((item, index) => {
              const { imageUrls, name, offerPrice, brand ,_id} = item;
              return (
                <div key={index} className="p-4 w-full sm:w-2/4 lg:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img
                      className="lg:h-80  h-96 w-full"
                      src={imageUrls[0]}
                      alt="blog"
                      onClick={() => navigate(`/product/${index}`)}
                    />
                    <div className="p-6">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        onClick={() => navigate(`/product/${index}`)}
                      >
                        {brand}
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        onClick={() => navigate(`/product/${index}`)}
                      >
                        {name.substring(0, 60)}
                      </h1>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        onClick={() => navigate(`/product/${index}`)}
                      >
                        ₹{offerPrice.toFixed(2)}
                      </h1>

                      <div className="flex justify-center ">
                        <button onClick={()=> handleAddToCart(_id,1)} className=" bg-green-500 hover:bg-green-500 w-full text-white py-[4px] rounded-lg font-bold">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

// import React, { useState, useEffect } from "react";
// import { Box, Grid, Typography, Avatar, Button, Rating } from "@mui/material";
// import axios from "axios";
// import moment from "moment";

// const ReviewSection = ({ productId,refreshReviews }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `https://fashionoasis-backend.onrender.com/api/v1/reviews/${productId}`
//         );
//         setReviews(response.data.reviews);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   return (
//     <>
//       <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6 mx-[60px] mb-10">
//         <h3 className="text-xl font-bold text-gray-800">
//           Reviews({reviews.length})
//         </h3>
//         <div className="grid md:grid-cols-2 gap-12 mt-4">
//           <div>
//             {reviews.map((review, index) => {
//               const timeAgo = moment(review.createdAt).fromNow();
//               return (
//                 <div className="flex items-start border p-4 my-3 rounded-md shadow-xl">
//                   <Avatar
//                     src={review.userDelails.imageUrl}
//                     alt={review.userDelails.name}
//                   />
//                   <div className="ml-3">
//                     <h4 className="text-sm font-bold text-gray-800">
//                       {review.userDelails.name}
//                     </h4>
//                     <div className="flex space-x-1 mt-1">
//                       <Rating name="read-only" precision={0.5} value={review.rating} readOnly />
//                       <p className="text-xs !ml-2 font-semibold text-gray-800">
//                         {timeAgo}
//                       </p>
//                     </div>
//                     <p className="text-sm mt-4 text-gray-800">
//                       {review.review}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReviewSection;

// import React, { useState, useEffect } from "react";
// import { Box, Grid, Typography, Avatar, Button, Rating } from "@mui/material";
// import axios from "axios";
// import moment from "moment";

// const ReviewSection = ({ productId, refreshReviews }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `https://fashionoasis-backend.onrender.com/api/v1/reviews/${productId}`
//         );
//         // Sort reviews by createdAt in descending order
//         const sortedReviews = response.data.reviews.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setReviews(sortedReviews);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, [productId]);

//   return (
//     <>
//       <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6 mx-[60px] mb-10">
//         <h3 className="text-xl font-bold text-gray-800">
//           Reviews({reviews.length})
//         </h3>
//         <div className="grid md:grid-cols-2 gap-12 mt-4">
//           <div>
//             {reviews.map((review, index) => {
//               const timeAgo = moment(review.createdAt).fromNow();
//               return (
//                 <div className="flex items-start border p-4 my-3 rounded-md shadow-xl">
//                   <Avatar
//                     src={review.userDelails.imageUrl}
//                     alt={review.userDelails.name}
//                   />
//                   <div className="ml-3">
//                     <h4 className="text-sm font-bold text-gray-800">
//                       {review.userDelails.name}
//                     </h4>
//                     <div className="flex space-x-1 mt-1">
//                       <Rating name="read-only" precision={0.5} value={review.rating} readOnly />
//                       <p className="text-xs !ml-2 font-semibold text-gray-800">
//                         {timeAgo}
//                       </p>
//                     </div>
//                     <p className="text-sm mt-4 text-gray-800">
//                       {review.review}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReviewSection;



import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Avatar, Rating } from "@mui/material";
import axios from "axios";
import moment from "moment";

const ReviewSection = ({ productId, refreshReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://fashionoasis-backend.onrender.com/api/v1/reviews/${productId}`
        );
        const reviewsData = response.data.reviews;

        // Sort reviews by createdAt in descending order
        const sortedReviews = reviewsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);

        // Calculate total rating and counts for each rating
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / reviewsData.length;
          setAverageRating(averageRating);

          const counts = reviewsData.reduce((acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
          }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
          
          setRatingCounts(counts);
        } else {
          setAverageRating(0);
          setRatingCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <>
      <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6 mx-[60px] mb-10">
        <h3 className="text-xl font-bold text-gray-800">
          Reviews ({reviews.length})
        </h3>
        <div className="flex items-center mt-4">
          <Typography variant="h6">Total Rating:</Typography>
          <Rating name="read-only" precision={0.5} value={averageRating} readOnly />
          <Typography variant="body2" className="ml-2">
            {averageRating.toFixed(1)} out of 5
          </Typography>
        </div>

        {/* Display count for each rating */}
        {/* <div className="mt-4">
          {Object.entries(ratingCounts).map(([rating, count]) => (
            <div key={rating} className="flex items-center">
              <Rating name="read-only" value={Number(rating)} readOnly />
              <Typography variant="body2" className="ml-2">
                {count} {count === 1 ? "review" : "reviews"}
              </Typography>
            </div>
          ))}
        </div> */}

        <div className="grid md:grid-cols-2 gap-12 mt-4">
          <div>
            {reviews.map((review, index) => {
              const timeAgo = moment(review.createdAt).fromNow();
              return (
                <div className="flex items-start border p-4 my-3 rounded-md shadow-xl" key={index}>
                  <Avatar
                    src={review.userDelails.imageUrl}
                    alt={review.userDelails.name}
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-800">
                      {review.userDelails.name}
                    </h4>
                    <div className="flex space-x-1 mt-1">
                      <Rating name="read-only" precision={0.5} value={review.rating} readOnly />
                      <p className="text-xs !ml-2 font-semibold text-gray-800">
                        {timeAgo}
                      </p>
                    </div>
                    <p className="text-sm mt-4 text-gray-800">
                      {review.review}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;

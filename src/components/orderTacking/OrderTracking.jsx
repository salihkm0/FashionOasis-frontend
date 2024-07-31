// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// export default function HorizontalLinearAlternativeLabelStepper(orderStatus) {
//   const [indexId, setindexId] = React.useState(0);
//   // "order-placed","processing", "on-the-way", "delivered", "cancelled"

//   console.log(orderStatus)

// const handleOrderTracking = () => {
//   if (orderStatus === "order-placed") {
//     setindexId(0);
//   } else if (orderStatus === "processing") {
//     setindexId(1);
//   } else if (orderStatus === "on-the-way") {
//     setindexId(2);
//   } else if (orderStatus === "delivered") {
//     setindexId(3);
//   } else if (orderStatus === "cancelled") {
//     setindexId(4);
//   }
// }
//   React.useEffect(() => {
//     handleOrderTracking();
//   }, [orderStatus])

//   console.log(indexId)

//   const steps = [
//     {
//       title: "Order Placed",
//       des: "Your order has been placed",
//     },
//     {
//       title: "Preparing",
//       des: "Your order is being Prepared",
//     },
//     {
//       title: "On the way",
//       des: "Our delivery exicutive is on the way to delivery",
//     },
//     {
//       title: "Deliverd ",
//       des: "Your order was deliverd sucessfully",
//     },
//   ];

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={1} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>
//               <h2>{label.title}</h2>
//               {/* <p>{label.des}</p> */}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function HorizontalLinearAlternativeLabelStepper({
  orderStatus,
}) {
  const [indexId, setIndexId] = React.useState(0);

  // Array of steps
  const steps = [
    {
      title: "Order Placed",
      des: "Your order has been placed",
    },
    {
      title: "Preparing",
      des: "Your order is being prepared",
    },
    {
      title: "On the way",
      des: "Our delivery executive is on the way to delivery",
    },
    orderStatus === "cancelled"
      ? {
          title: "Cancelled",
          des: "Your order has been cancelled",
        }
      : {
          title: "Delivered",
          des: "Your order was delivered successfully",
        },
  ];

  // Function to track order status and set the active step
  const handleOrderTracking = () => {
    if (orderStatus === "order-placed") {
      setIndexId(0);
    } else if (orderStatus === "processing") {
      setIndexId(1);
    } else if (orderStatus === "on-the-way") {
      setIndexId(2);
    } else if (orderStatus === "delivered") {
      setIndexId(3);
    } else if (orderStatus === "cancelled") {
      setIndexId(4);
    }
  };

  // Call the function whenever orderStatus changes
  React.useEffect(() => {
    handleOrderTracking();
  }, [orderStatus]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={indexId} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <h2>{label.title}</h2>
              {/* You can uncomment the next line to show descriptions */}
              {/* <p>{label.des}</p> */}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

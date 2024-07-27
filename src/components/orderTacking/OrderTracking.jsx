import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
{
title : 'Order Placed',
des : 'Your order has been placed',
},
{
title : 'Preparing',
des : 'Your order is being Prepared',
},
{
title : 'On the way',
des : 'Our delivery exicutive is on the way to delivery'
},
{
title : 'Deliverd',
des : 'Your order was deliverd sucessfully'
},
];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
            <h2>{label.title}</h2>
            {/* <p>{label.date}</p> */}
            </StepLabel>
            
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

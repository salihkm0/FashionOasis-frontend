import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2} className="mt-4">
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        className="mx-auto"
      />
    </Stack>
  );
};

export default CustomPagination;

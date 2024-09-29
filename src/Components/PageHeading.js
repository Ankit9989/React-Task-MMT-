import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { MEDIA_QUERY_LIMIT } from "../utils/commonFunction";

const PageHeading = ({ heading, size }) => {
  const isMobile = useMediaQuery(MEDIA_QUERY_LIMIT);

  return (
    <Typography
      fontWeight={600}
      fontSize={size ? size : isMobile ? 20 : 24} 
      variant={isMobile ? "h6" : "h5"} 
    >
      {heading}
    </Typography>
  );
};

export default PageHeading;

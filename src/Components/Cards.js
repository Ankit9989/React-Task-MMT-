import { Stack } from "@mui/material";
import React from "react";

const Cards = ({
  children,
  borderRadius = 2.5,
  padding = "16px 12px",
  backGroundColor = "#FFF",
  cardWidth = "100%",
  justifyContent = "center",
  border = "",
}) => {
  return (
    <Stack
      justifyContent={justifyContent}
      width={cardWidth}
      p={padding}
      borderRadius={borderRadius}
      bgcolor={backGroundColor}
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      border={border}
    >
      {children}
    </Stack>
  );
};

export default Cards;

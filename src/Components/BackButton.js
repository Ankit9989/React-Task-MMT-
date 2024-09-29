import React, { memo } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const BackButton = ({
  buttonText = "Back",
  backBtnClickHandler,
}) => {
  const navigate = useNavigate();
  const btnClickHandler = () => {
    navigate(-1);
  };
  return (
    <Button
      startIcon={<ArrowBackIcon />}
      onClick={backBtnClickHandler ? backBtnClickHandler : btnClickHandler}
      sx={{ width: "fit-content" }}
      id="back-button"
    >
     {buttonText} {" "}
    </Button>
  );
};
export default memo(BackButton);


import React, { memo } from "react";

import { InputLabel } from "@mui/material";

const LabelOfInputs = ({ label, isRequired = false }) => {

    return (
  
      <InputLabel>
  
        {label}
  
        {isRequired && <span style={{ color: "red", fontSize: "13px" }}>*</span>}
  
      </InputLabel>
  
    );
  
  };

  export default memo(LabelOfInputs);
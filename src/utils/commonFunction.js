export const validateValue = (inputValue, regexType) => {

    let value = "";
  
    switch (regexType) {
  
      case "number":
  
        value = inputValue.replace(/\D/g, "");
  
        break;
  
      case "alphabets":
  
        value = inputValue.replace(/[^A-Za-z\s]/g, "");
  
        break;
  
      case "alphaNumerics":
  
        value = inputValue.replace(/[^a-zA-Z0-9]/g, "");
  
        break;
  
      case "numberWithDecimal":
  
        value = inputValue.replace(/[^0-9.]/g, "").replace(/^0+(\d)/, "$1");
  
        // Ensure there's only one decimal point
  
        const decimalCount = (value.match(/\./g) || []).length;
  
        if (decimalCount > 1) {
  
          value = inputValue.slice(0, -1); // Remove last character if more than one decimal point
  
        }
  
        // Ensure only two decimal places are allowed
  
        const decimalIndex = value.indexOf(".");
  
        if (decimalIndex !== -1 && value.length - decimalIndex > 3) {
  
          value = value.slice(0, decimalIndex + 3); // Keep only two decimal places
  
        }
  
        break;
  
      case "alphabetsWithDot":
  
        value = inputValue.replace(/[^a-zA-Z. ]+/g, "");
  
        break;
  
      default:
  
        value = inputValue;
  
        break;
  
    }
  
    return value;
  
  };

  export const MEDIA_QUERY_LIMIT = "(max-width:767px)";
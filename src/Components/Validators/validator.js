import rules from './rules'
import { testEmailValidation } from './Regex';

const validator = (value, validations) => {
  let validationArray = [];

  for (const validation of validations) {
    if ((validation.value === rules.requiredValue)) {
      value.trim().length === 0 && validationArray.push(false);
    }
     if ((validation.value === rules.minValue)) {
      value.trim().length < validation.min && validationArray.push(false);
    }
     if ((validation.value === rules.maxValue)) {
      value.length > validation.max && validationArray.push(false);
    }
     if ((validation.value === rules.emailValue)) {
      !testEmailValidation(value) && validationArray.push(false);
    }
  }

  if(validationArray.length){
    return false
  } else{
    return true
  }
  
};


export default validator

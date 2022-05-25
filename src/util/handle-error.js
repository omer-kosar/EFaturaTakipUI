import { error } from "./notify";

const handleValidationError = (errors) => {
  Object.values(errors).forEach((message, index) => {
    error(message);
  });
};

const handleError = (exception) => {
  error(exception.response.data);
};
export { handleValidationError, handleError };

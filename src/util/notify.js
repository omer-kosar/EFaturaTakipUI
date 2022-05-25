import { Notify } from "quasar";
const config = {
  position: "top-right",
  group: false,
};
const warning = (message) => {
  Notify.create({
    ...config,
    type: "warning",
    textColor: "white",
    message: message,
  });
};
const error = (message) => {
  Notify.create({
    ...config,
    type: "negative",
    message: message,
  });
};
const success = (message) => {
  Notify.create({
    ...config,
    type: "positive",
    message: message,
  });
};
const info = (message) => {
  Notify.create({
    ...config,
    type: "info",
    message: message,
  });
};

export { warning, error, success, info };

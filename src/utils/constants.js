export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";
export const LOADING = "LOADING";
export const NOT_LOADED = "NOT_LOADED";

const prod = {
  API_URL: "/scry",
};
const dev = {
  API_URL: "",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

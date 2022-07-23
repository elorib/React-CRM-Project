import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

function setHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

const httpService = {
  setHeader,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;

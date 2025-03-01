import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://codebug-livid.vercel.app/",

});

export default axiosInstance;


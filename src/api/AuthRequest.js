import axios from "axios";

const API = axios.create({
  baseURL: "https://axs-social-media.herokuapp.com/",
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const singUp = (formData) => API.post("/auth/register", formData);

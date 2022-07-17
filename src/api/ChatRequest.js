import axios from "axios";

const API = axios.create({
  baseURL: "https://axs-social-media.herokuapp.com/",
});

export const userChats = (id) => API.get(`/chat/${id}`);
export const createChat = (usersId) => API.post("/chat", usersId);

import axios from "axios";

export const swrConfig = {
  fetcher: (url) => axios.get(url, { baseURL: "/api" }).then((res) => res.data),
};

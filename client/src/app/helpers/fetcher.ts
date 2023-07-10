import axios from "axios";
const fetcher = (url: string) => axios.get(url, {
  headers: {
    "x-access-token": localStorage.getItem("token") || ""
  }
}).then((res) => res.data);


export default fetcher
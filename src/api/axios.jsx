import axios from "axios";

const api = axios.create(
{
    baseURL:"https://job-board-backend-zwyb.onrender.com/api/v1",
    withCredentials: true,
}
)
export default api 
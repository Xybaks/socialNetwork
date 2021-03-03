import axios from "axios";
// DAL -data access level
// Promises

// экземпляр axios , в котором указываются общие свойства
const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "82f4b5ca-f1e3-4d75-b4a1-7334dd345bb3"
    }
})
// объект-упаковка для методов работы REST API с юзерами
export const usersAPI = {
    //метод получения от сервера пользователей
    getUsers: (currentPage = 1, pageSizes = 10) => (
        instance.get(`users?page=${currentPage}&count=${pageSizes}`, {})
            .then(response => response.data)
    ),
    unfollowUser: (userId: number) => (instance.delete(`/follow/${userId}`,
        {})
        .then(response => response.data)),
    followUser: (userId: number) => instance.post(`/follow/${userId}`,
        {}, {})
        .then(response => response.data)
}


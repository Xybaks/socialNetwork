import axios from "axios";
// DAL -data access level
// Promises

// экземпляр axios , в котором указываются общие свойства
const instance = axios.create({
    withCredentials: true, // разрешить запрос на другие серверы
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
    // запрос на сервер отписки от пользователя
    unfollowUser: (userId: number) => (instance.delete(`/follow/${userId}`,
        {})
        .then(response => response.data)),
    // запрос на сервер подписки на пользователя
    followUser: (userId: number) => instance.post(`/follow/${userId}`,
        {}, {})
        .then(response => response.data),
}

export const profileAPI = {
    // запрос на сервер для получения профайла пользователя
    getProfile(userId: number) {
        return instance.get(`/profile/` + userId)
    },
    // запрос на сервер для получения статуса пользователя
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    // put-запрос на сервер для отправки статуса пользователя
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    } // можно скоратить до {status}
};

// объект-упаковка для методов работы REST API с профайлом
export const authAPI = {
    me: () => instance.get(`/auth/me`)
}

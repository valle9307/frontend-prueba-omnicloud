import axios from 'axios'
import router from '@/router'
import useAuthStore from '@/store/auth'
import useAlertaStore from '@/store/alerta'

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(config => {
    return Promise.resolve(config);
  }, error => {
    let { status }  = error.response
    let authStore   = useAuthStore()
    let alertaStore = useAlertaStore()

    if (status === 401 || status === 419) {
        authStore.resetarAuth()
        alertaStore.resetearAlerta()
        router.push('/login')
    }

    return Promise.reject(error);
});

export default api 
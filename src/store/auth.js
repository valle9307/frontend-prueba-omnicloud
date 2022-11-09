import api from '@/api'
import router from '@/router'
import { defineStore } from 'pinia'


const useAuthStore = defineStore('auth',{
    state: () => ({
        erroresLogin: {},
        layoutActive: 'layout-login',
        loggedIn: false,
        user:{}
    }),
    actions: {
        async login(usuario) {
            this.erroresLogin = {}
            
            try {
                await api.get('/auth/sanctum/csrf-cookie')
                let { data } = await api.post('/auth/login',usuario)

                this.user         = (data.user || data)
                this.loggedIn     = true
                this.erroresLogin = {}
                this.layoutActive = 'layout-sitio'
                router.push('/home')
            } catch (error) {
                let { errors } = error.response.data

                this.erroresLogin = errors
            }
        },
        async logout() {
            try {
                await api.post('/auth/logout')
                this.user     = {}
                this.loggedIn = false
                this.layoutActive = 'layout-login'
                router.push('/login')
            } catch (error) {
                
            }
        },
        resetarAuth() {
            this.user         = {}
            this.loggedIn     = false
            this.layoutActive = 'layout-login'
        }
    },
    persist: true
})

export default useAuthStore
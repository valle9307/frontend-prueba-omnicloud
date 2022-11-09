<template>
    <header
        id="encabezado"
        class="d-flex align-items-center justify-content-between bg-white shadow-sm sticky-top"
        v-loading.fullscreen.lock="loading"
        element-loading-text="Cerrando sesión..."
    >
        <nav class="navbar navbar-expand-lg">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li 
                        v-for="{ title,name } in menus"
                        :key="title"
                        class="nav-item"
                    >
                        <router-link class="nav-link" :to="{ name }">
                            {{ title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="navbar-nav px-3">
            <li class="nav-item dropdown-center">
                <a
                    class="nav-link dropdown-toggle text-dark"
                    href="#"
                    id="submenusDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {{ authStore.user.name }}
                </a>
                <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="submenusDropdown">
                    <li>
                        <button class="dropdown-item" @click="logout()">
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </li>
        </ul>   
    </header>
</template>

<script>
import { ref }  from 'vue'
import useAuthStore from '@/store/auth'
import useFormularios from '@/composables/useFormularios'

export default {
    setup(){
        //Composables
        const authStore   = useAuthStore()
        const { loading } =  useFormularios()

        //Data
        const menus = ref([
            {
                title: 'Home',
                name: 'home'
            },
            {
                title: 'Autores',
                name: 'autores-index'
            },
            {
                title: 'Editoriales',
                name: 'editoriales-index'
            },
            {
                title: 'Libros',
                name: 'libros-index'
            }
        ])

        //Methods
        const logout = async () => {
            loading.value = true
            await authStore.logout()
            loading.value = false
        }

        return {
            authStore,
            menus,
            loading,
            logout
        }
    }
}
</script>

<style scoped>
    .dropdown-item {
        cursor: pointer;
    }
</style>

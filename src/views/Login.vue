<template>
    <card
        :footer="true"
        :header="true"
        clasesCard="border-0 shadow"
        clasesFooter="bg-white"
        clasesHeader="bg-white"
    >
        <template #header>
            <h3 class="mb-0">Iniciar sesión</h3>
        </template>
        <template #body>
            <form @submit.prevent="login()">
                <div class="mb-3">
                    <label class="mb-2">Email</label>
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="ingresar email"
                        v-model="usuario.email"
                        :disabled="loading"
                    >
                    <errores-formulario
                        v-if="erroresLogin.email"
                        :errores="erroresLogin.email"
                    />
                </div>
                <div class="mb-3">
                    <label class="mb-2">Contraseña</label>
                    <input
                        type="password"
                        class="form-control form-control-lg"
                        placeholder="ingresar constraseña"
                        v-model="usuario.password"
                        :disabled="loading"
                    >
                    <errores-formulario
                        v-if="erroresLogin.password"
                        :errores="erroresLogin.password"
                    />
                </div>
                <button
                    type="submit"
                    class="btn btn-success btn-lg w-100 my-2"
                    :disabled="loading"
                >
                    Ingresar
                    <spinner
                        v-if="loading"
                        tipo="white"
                        :small="true"
                    />
                </button>
            </form>
        </template>
        <template #footer>
            <h5 class="text-center mb-0"> &copy; </h5>
        </template>
    </card>
</template>

<script>
import { computed,ref } from 'vue'
import useFormularios from '@/composables/useFormularios'
import useAuthStore from '@/store/auth'

export default {
    setup() {
        //Composables
        const authStore   = useAuthStore()
        const { loading } = useFormularios()

        //Data
        const usuario= ref({
            email: null,
            password: null
        })

        //Methods
        const login = async () => {
            loading.value = true
            await authStore.login(usuario.value)
            loading.value = false
        }

        return {
            erroresLogin: computed(() => authStore.erroresLogin),
            loading,
            usuario,
            login
        }
    }
}
</script>
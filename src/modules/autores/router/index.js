export default [
    {
        path: '',
        name: 'autores-index',
        component: () => import(/* webpackChunkName: "autores-index" */ '../views/index.vue'),
        meta:{
            title: 'Autores',
            auth: true
        }
    },
    {
        path: '/autores/nuevo',
        name: 'autores-nuevo',
        component: () => import(/* webpackChunkName: "autores-nuevo" */ '../views/nuevo.vue'),
        meta:{
            title: 'Crear autor',
            auth: true
        }
    },
    {
        path: '/autores/:id/editar',
        name: 'autores-editar',
        component: () => import(/* webpackChunkName: "autores-editar" */ '../views/editar.vue'),
        meta:{
            title: 'Editar autor',
            auth: true
        }
    }
]
export default [
    {
        path: '',
        name: 'libros-index',
        component: () => import(/* webpackChunkName: "libros-index" */ '../views/index.vue'),
        meta:{
            title: 'Libros',
            auth: true
        }
    },
    {
        path: '/libros/nuevo',
        name: 'libros-nuevo',
        component: () => import(/* webpackChunkName: "libros-nuevo" */ '../views/nuevo.vue'),
        meta:{
            title: 'Nuevo libro',
            auth: true
        }
    },
    {
        path: '/libros/:id/editar',
        name: 'libros-editar',
        component: () => import(/* webpackChunkName: "libros-editar" */ '../views/editar.vue'),
        meta:{
            title: 'Editar libro',
            auth: true
        }
    }
]
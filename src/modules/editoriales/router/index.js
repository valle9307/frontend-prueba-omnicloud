export default [
    {
        path: '',
        name: 'editoriales-index',
        component: () => import(/* webpackChunkName: "editoriales-index" */ '../views/index.vue'),
        meta:{
            title: 'Editoriales',
            auth: true
        }
    },
    {
        path: '/editoriales/nuevo',
        name: 'editoriales-nuevo',
        component: () => import(/* webpackChunkName: "editoriales-nuevo" */ '../views/nuevo.vue'),
        meta:{
            title: 'Nueva editorial',
            auth: true
        }
    },
    {
        path: '/editoriales/:id/editar',
        name: 'editoriales-editar',
        component: () => import(/* webpackChunkName: "editoriales-edit" */ '../views/editar.vue'),
        meta:{
            title: 'Editar editorial',
            auth: true
        }
    }
]
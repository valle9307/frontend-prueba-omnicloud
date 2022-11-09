import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import es from 'element-plus/dist/locale/es'

export default {
    install: (app) => {
        app.use(ElementPlus,{ locale: es, size: 'large' })
    }
}
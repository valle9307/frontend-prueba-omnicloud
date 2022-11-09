import { 
    faBars, faCheck, faCheckCircle, faEraser, faExclamationCircle,faExclamationTriangle,
    faInfoCircle, faSearch, faHome, faUserGroup, faPeopleGroup, faCar, faToolbox, faRulerCombined,
    faCarSide, faCog, faTools, faAngleDown, faBook, faPlus, faPen, faUserTie, faAddressBook, faArrowLeftLong,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(
    faBars, faCheck, faCheckCircle, faEraser, faExclamationCircle,faExclamationTriangle,
    faInfoCircle, faSearch, faHome,faUserGroup,faPeopleGroup,faCar, faToolbox, faRulerCombined,
    faCarSide, faCog, faTools, faAngleDown, faBook, faPlus, faPen, faUserTie, faAddressBook,
    faArrowLeftLong, faTrashAlt
)

export default {
    install: (app) => {
        app.component('iconos', FontAwesomeIcon)
    }
}
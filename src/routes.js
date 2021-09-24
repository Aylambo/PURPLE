import { Home } from './pages/Home.jsx'
import Currency  from './cmps/Currency.jsx'
import Table  from './cmps/Table/Table.jsx'
import UploadCmp  from './cmps/UploadCmp.jsx'

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/currency',
        component: Currency,
    },
    {
        path: '/table',
        component: Table,
    },
    {
        path: '/UploadCmp',
        component: UploadCmp,
    },
    // {
    //     path: '/login',
    //     component: SignIn,
    // },
    
]
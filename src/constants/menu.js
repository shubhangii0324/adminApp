import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Dashboard', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Products', icon: Box, type: 'sub', active: false, children: [
                    { path: '/category', title: 'Category', type: 'link' },
                    { path: '/products', title: 'Product List', type: 'link' },
                    { path: '/add-products', title: 'Add Product', type: 'link' },
        ]
    },
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            { path: '/sales/transactions', title: 'Transactions', type: 'link' },
        ]
    },
    {
        title: 'Coupons', icon: Tag, type: 'sub', active: false, children: [
            { path: '/list-coupon', title: 'List Coupons', type: 'link' },
            { path: '/create-coupon', title: 'Create Coupons', type: 'link' },
        ]
    },
    {
        title: 'Users', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/list-user', title: 'User List', type: 'link' },
            { path: '/create-user', title: 'Create User', type: 'link' },
        ]
    },
    {
        path: '/list-seller', title: 'Sellers', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Taxes', icon: Chrome, type: 'sub', children: [
            { path: '/list-taxes', title: 'Tax List', type: 'link' },
            { path: '/create-taxes', title: 'Tax Create', type: 'link' }
        ]
    },
    {
        title: 'Reports',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Settings', icon: Settings, type: 'sub', children: [
            { path: '/settings/profile', title: 'Profile', type: 'link' },
        ]
    },
    {
        title: 'Invoice',path:'/invoice', icon: Archive, type: 'link', active: false
    },
    {
        title: 'Login',path:'/', icon: LogIn, type: 'link', active: false
    }
]

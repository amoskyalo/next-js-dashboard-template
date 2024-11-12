import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentIcon from '@mui/icons-material/Payment';
import StoreIcon from '@mui/icons-material/Store';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeIcon from '@mui/icons-material/Code';
import { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Overview',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'products',
        title: 'Products',
        icon: <InventoryIcon />,
    },
    {
        segment: 'sales',
        title: 'Sales',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'customers',
        title: 'Customers',
        icon: <PeopleIcon />,
    },
    {
        segment: 'team',
        title: 'Team Management',
        icon: <GroupsIcon />,
        children: [
            {
                segment: 'positions',
                title: 'Positions',
                icon: <WorkIcon />,
            },
            {
                segment: 'members',
                title: 'Team Members',
                icon: <PersonIcon />,
            },
        ],
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Commerce',
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <CategoryIcon />,
    },
    {
        segment: 'transactions',
        title: 'Transactions',
        icon: <PaymentIcon />,
    },
    {
        segment: 'retail',
        title: 'Retail',
        icon: <StoreIcon />,
        children: [
            {
                segment: 'shops',
                title: 'Shops',
                icon: <LocalMallIcon />,
            },
            {
                segment: 'warehouses',
                title: 'Warehouses',
                icon: <WarehouseIcon />,
            },
        ],
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <AssessmentIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'settings',
        title: 'Settings',
        icon: <SettingsIcon />,
    },
    {
        segment: 'developer',
        title: 'Developer', 
        icon: <CodeIcon />,
    },
];

export default NAVIGATION;

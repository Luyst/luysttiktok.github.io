import config from '~/config';
// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Explore from '~/pages/Explore';
import Friends from '~/pages/Friends';
import Live from '~/pages/Live';
import User from '~/pages/User';
import Search from '~/pages/Search';
import Login from '~/component/Login';
import Upload from '~/pages/Upload';

// Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        icon: 'bx bx-home',
        activeIcon: 'bx bxs-home',
        label: 'Home',
        component: Home,
    },
    {
        path: config.routes.explore,
        icon: 'bx bx-compass',
        activeIcon: 'bx bxs-compass',
        label: 'Explore',
        component: Explore,
    },
    {
        path: config.routes.following,
        icon: 'bx bx-user-check',
        activeIcon: 'bx bxs-user-check',
        label: 'Following',
        component: Following,
    },
    {
        path: config.routes.friends,
        icon: 'bx bx-group',
        activeIcon: 'bx bxs-group',
        label: 'Friends',
        component: Friends,
    },
    { path: config.routes.live, icon: 'bx bx-video', activeIcon: 'bx bxs-video', label: 'LIVE', component: Live },
    { path: config.routes.user, icon: '', activeIcon: '', label: '', component: User },
    {
        path: config.routes.userNonQuery,
        icon: 'bx bx-user',
        activeIcon: 'bx bxs-user',
        label: 'Profile',
        component: User,
    },
    { path: config.routes.search, icon: '', activeIcon: '', label: '', component: Search },
    { path: config.routes.search1, icon: '', activeIcon: '', label: '', component: Search },
    { path: config.routes.login, icon: '', activeIcon: '', label: '', component: Login, layout: Login },
    { path: config.routes.upload, icon: '', activeIcon: '', label: '', component: Upload },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

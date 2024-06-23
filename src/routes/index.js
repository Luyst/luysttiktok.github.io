import config from '~/config';
// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Explore from '~/pages/Explore';
import Friends from '~/pages/Friends';
import Live from '~/pages/Live';
import User from '~/pages/User';

// Public routes
const publicRoutes = [
    {
        path: config.routes.home,
        icon: 'bx bx-home',
        activeIcon: 'bx bxs-home',
        label: 'Dành cho bạn',
        component: Home,
    },
    {
        path: config.routes.explore,
        icon: 'bx bx-compass',
        activeIcon: 'bx bxs-compass',
        label: 'Khám phá',
        component: Explore,
    },
    {
        path: config.routes.following,
        icon: 'bx bx-user-check',
        activeIcon: 'bx bxs-user-check',
        label: 'Đang Follow',
        component: Following,
    },
    {
        path: config.routes.friends,
        icon: 'bx bx-group',
        activeIcon: 'bx bxs-group',
        label: 'Bạn bè',
        component: Friends,
    },
    { path: config.routes.live, icon: 'bx bx-video', activeIcon: 'bx bxs-video', label: 'LIVE', component: Live },
    { path: config.routes.user, icon: 'bx bx-user', activeIcon: 'bx bxs-user', label: 'Hồ sơ', component: User },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

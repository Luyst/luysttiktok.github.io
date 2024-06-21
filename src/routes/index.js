import config from '~/config';
// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Explore from '~/pages/Explore';
import Friends from '~/pages/Friends';


// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.explore, component: Explore },
    { path: config.routes.friends, component: Friends },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
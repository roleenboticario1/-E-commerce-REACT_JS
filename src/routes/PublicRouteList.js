import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';
import Page403 from '../components/error/Page403';
import Page404 from '../components/error/Page404';
import ViewCategory from '../components/frontend/collections/ViewCategory';

const  PublicRouteList  = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/about', exact: true, name : 'About', component: About },
    { path: '/contact', exact: true, name : 'Contact', component: Contact },
    { path: '/about', exact: true, name : 'About', component: About },
    { path: '/403', exact: true, name : 'Page403', component: Page403 },
    { path: '/404', exact: true, name : 'Page404', component: Page404 },
    { path: '/collections', exact: true, name : 'ViewCategory', component: ViewCategory },
];

export default PublicRouteList;
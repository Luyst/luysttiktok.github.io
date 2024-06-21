import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import style from './default.module.scss'

function DefaultLayout({children}) {
    return ( 
        <div>
            <Header/>
            <div className="container">
                <Sidebar/>
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
        
    );
}

export default DefaultLayout;
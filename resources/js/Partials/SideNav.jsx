import {Link, usePage} from "@inertiajs/react";
import axios from "axios";

const SideNav = () => {

    const {url, component} = usePage();

    const {superAdmin, auth} = usePage().props;

    const updateInertiaRootClass = () => {
        const dynamicClass = 'layout-menu-expanded';
        document.documentElement.classList.remove(dynamicClass);
    }


    const handleLogout = async () => {
        try {
            const response = await axios.post(route('logout'));
            if (response.status === 200) {
                window.location.href = '/'

            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <a href="https://www.xyberixsolutions.com/" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="/dashboard/assets/xyberix.jpg" alt='Logo'
                             style={{height: '50px', width: '50px'}}></img>
                    </span>
                    <span>Xyberix</span>
                </a>
                <a onClick={updateInertiaRootClass} href="#"
                   className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1">
                <li className={component === 'Home' ? 'menu-item active' : 'menu-item'}>
                    <Link href={route('home.index')} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Home">Home</div>
                    </Link>
                </li>
                {
                    superAdmin && (
                        <li className={url.startsWith('/dashboard/appuser') ? 'menu-item active' : 'menu-item'}>
                            <Link href={route('appuser.index')} className="menu-link">
                                <i className="menu-icon tf-icons bx bx-user"></i>
                                <div data-i18n="Users">Users</div>
                            </Link>
                        </li>
                    )
                }
                <li className={url.startsWith('/dashboard/inbox') ? 'menu-item active' : 'menu-item'}>
                    <Link href={route('inbox.index')} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-mail-send"></i>
                        <div data-i18n="Inbox">Inbox</div>
                    </Link>
                </li>
                <li className={url.startsWith('/dashboard/tasks') ? 'menu-item active' : 'menu-item'}>
                    <Link href={route('task.index')} className="menu-link">
                        <i className="menu-icon tf-icons bx bx-task"></i>
                        <div data-i18n="Tasks">Tasks</div>
                    </Link>
                </li>
                <li className={url.startsWith('/dashboard/report') ? 'menu-item active' : 'menu-item'}>
                    <Link href={route('report.index')} className="menu-link">
                        <i className="menu-icon tf-icons bx bxs-report"></i>
                        <div data-i18n="Report">Report</div>
                    </Link>
                </li>
                <li className="menu-item">
                    <a href="/chatify" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-chat"></i>
                        <div data-i18n="Chat">Chat</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a type="button" onClick={handleLogout} className="menu-link" href="#">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                    </a>
                </li>
            </ul>
        </aside>
    );
}
export default SideNav;

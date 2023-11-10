import SideNav from "@/Partials/SideNav.jsx";
import NavBar from "@/Partials/NavBar.jsx";
import Footer from "@/Partials/Footer.jsx";
import {Idle} from 'idlejs';
import {useEffect, useState} from "react";
import apiConstants from "@/apiConstants.js";
import axios from "axios";
import {usePage} from "@inertiajs/react";

const DashboardLayout = ({children}) => {

    const {auth, superAdmin} = usePage().props;

    const makeOfflineCall = async () => await axios.get(`${apiConstants}/users/offline/${auth.user.id}`);

    const makeOnlineCall = async () => await axios.get(`${apiConstants}/users/online/${auth.user.id}`);

    const [userStatus, setUserStatus] = useState('offline');

    useEffect(() => {
        if (!superAdmin) {
            let isUserIdle = false;

            const idle = new Idle()
                .whenNotInteractive()
                .within(15)
                .do(() => {
                    if (!isUserIdle) {
                        makeOfflineCall().then(() => setUserStatus('offline'));
                        isUserIdle = true;
                        console.log('user is offline');
                    }
                })
                .start();

            const setActive = () => {
                if (isUserIdle) {
                    makeOnlineCall().then(() => setUserStatus('online'));
                    isUserIdle = false;
                    console.log('user is online');
                }
            };

            window.addEventListener('mousemove', setActive);
            window.addEventListener('keydown', setActive);

            return () => {
                idle.stop();
                window.removeEventListener('mousemove', setActive);
                window.removeEventListener('keydown', setActive);
            };
        }
    }, []);


    return (
        <>

            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <SideNav></SideNav>
                    <div className="layout-page">
                        <NavBar userStatus={userStatus}></NavBar>
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {children}
                            </div>
                            <Footer></Footer>
                            <div className="content-backdrop fade"></div>
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
            </div>
        </>
    );
}
export default DashboardLayout;

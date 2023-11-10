import {Link, router, usePage,} from "@inertiajs/react";
import axios from "axios";
import {useEffect, useState} from "react";
import notificationSound from '/public/sounds/chatify/iphone.mp3'
import OffCanvas from "@/Components/OffCanvas.jsx";
import '../core.css'

const NavBar = ({userStatus}) => {

    const {auth, allNotifications, superAdmin} = usePage().props;

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(allNotifications);
    }, [])


    useEffect(() => {
        if (superAdmin === true) {
            const publicChannel = window.Echo.channel('public-notification-channel');

            const handleEvent = (event) => {
                if (event) {
                    const audio = new Audio(notificationSound);
                    audio.play();
                    setNotifications((prevNotifications) => [...prevNotifications, event.notify]);
                }
            };

            publicChannel.listen('.new-notification-message', handleEvent);

            return () => {
                publicChannel.stopListening('.new-notification-message', handleEvent);
            };
        }
    }, []);


    const handleLogout = async () => {
        try {
            const response = await axios.post(route('logout'));
            if (response.status === 200) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateInertiaRootClass = () => {
        const dynamicClass = 'layout-menu-expanded';
        document.documentElement.classList.add(dynamicClass);
    }

    const showOffcanvas = () => {
        const offcanvasBoth = document.getElementById('offcanvasBoth');
        if (offcanvasBoth) {
            const offcanvas = new bootstrap.Offcanvas(offcanvasBoth);
            offcanvas.show();
        }
    };

    const handleDelete = (id) => {
        router.delete(route('notify.delete', id), {
            onSuccess: () => {
                setNotifications(notifications.filter((notification) => notification.id !== id));
            }
        });
    }

    const handleClear = () => {
        router.get(route('notify.clear'), {
            onSuccess: () => {
                setNotifications([]);
            }
        });
    }


    return (
        <>
            <OffCanvas
                handleDelete={(id) => handleDelete(id)}
                clear={() => handleClear()}
                notifications={notifications}>
            </OffCanvas>
            <nav
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
            >
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href="#" id="customButton"
                       onClick={updateInertiaRootClass}>
                        <i className="bx bx-menu bx-sm"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <div className="navbar-nav align-items-center">
                        <div className="nav-item d-flex align-items-center">
                            <i className="bx bx-search fs-4 lh-0"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."
                            />
                        </div>
                    </div>
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item lh-1 me-3 ">
                            {
                                superAdmin && (
                                    <button onClick={showOffcanvas} className="nav-link dropdown-toggle hide-arrow"
                                            style={{border: 'none', background: 'none', cursor: 'pointer'}}
                                            data-bs-auto-close="outside" aria-expanded="false">
                                        <i className="bx bx-bell bx-sm"></i>
                                        <span
                                            className="badge bg-danger rounded-pill badge-notifications">{notifications.length}</span>
                                    </button>
                                )
                            }
                        </li>
                        <li className="nav-item navbar-dropdown dropdown-user dropdown">
                            <a className="nav-link dropdown-toggle hide-arrow" href="#"
                               data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    {
                                        auth.user.profile != null ?
                                            <img
                                                alt="profile"
                                                src={`/storage/users/${auth.user.profile}`}
                                                className="w-px-40 h-auto rounded-circle"
                                            />
                                            :
                                            <img
                                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                                alt="placeholder" className="w-px-40 h-auto rounded-circle"/>
                                    }
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <div className="avatar avatar-online">
                                                    {
                                                        auth.user.profile != null ?
                                                            <img
                                                                src={`/storage/users/${auth.user.profile}`}
                                                                alt="profile"
                                                                className="w-px-40 h-auto rounded-circle"/>
                                                            :
                                                            <img
                                                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                                                alt="placeholder"
                                                                className="w-px-40 h-auto rounded-circle"/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <span className="fw-semibold d-block">{auth.user.name}</span>
                                                <small className="text-muted">{userStatus}</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href={route('profile.index')}>
                                        <i className="bx bx-user me-2"></i>
                                        <span className="align-middle">My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-cog me-2"></i>
                                        <span className="align-middle">Settings</span>
                                    </a>
                                </li>

                                <li>
                                    <div className="dropdown-divider"></div>
                                </li>
                                <li>
                                    <a type="button" onClick={handleLogout} className="dropdown-item" href="#">
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
export default NavBar;

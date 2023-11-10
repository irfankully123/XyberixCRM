import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import successToast from "@/SweetAlerts/SuccessToast.js";
import { useRef, useState } from "react";
import { debounce } from 'lodash';
import '../../email.css'
import Modal from "@/Components/Modal";

const InboxIndex = ({ mails }) => {

    const { create, destroy, show } = usePage().props;

    const [modalState, setModalState] = useState({ compose: false, reply: false, detail: false });

    const initState = {
        id: null,
        source: "",
        fullname: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        budget: "",
        message: "",
        created_at: "",
        updated_at: ""
    }

    const [hiddenMail, setHiddenMail] = useState(initState)

    const resetHidden = () => setHiddenMail(initState)

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: "",
        subject: "",
        message: ""
    })

    function submitReply() {
        post(route('inbox.reply', hiddenMail.id), {
            onSuccess: () => {
                successToast('Message Send');
                reset();
                setModalState(!modalState.reply);
                resetHidden();
                clearErrors();
            }
        });
    }


    const showAlert = (fullname, id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You will not be able to recover this ${fullname}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                router.delete(route('inbox.destroy', id))
                successToast('Deleted Successfully')
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked cancel button
            }
        });
    }

    const searchRef = useRef("");

    const prevSearchRef = useRef("");

    const debouncedSetSearch = debounce((value) => {
        searchRef.current = value;
        if (value !== prevSearchRef.current) {
            prevSearchRef.current = value;
            router.get(route('inbox.index'), { search: value }, {
                preserveState: true,
                replace: true
            });
        }
    }, 300);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        debouncedSetSearch(value);
    };

    const printShorterString = (inputString, maxLength) => {
        if (inputString.length <= maxLength) {
            return inputString;
        } else {
            return inputString.slice(0, maxLength) + '...';
        }
    }

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        return `${formattedHours}:${minutes} ${ampm}`;
    }

 

    const submitCompose = () => {
        post(route('inbox.send', data.hiddenId), {
            onSuccess: () => {
                successToast('Message Send');
                reset();
                clearErrors();
            }
        });
    }

    return (
        <DashboardLayout>
            <Head><title>Inbox</title></Head>
            <Modal
                maxHeight="650px"
                maxWidth="800px"
                show={modalState.detail}
                title={hiddenMail.fullname}
                onClose={() => { resetHidden(); setModalState({ ...modalState, detail: !modalState.detail }) }}
            >
              <span>Fullname: {hiddenMail.fullname}</span>
              <br />
              <span>Email: {hiddenMail.email}</span>
              <br />
              <span>Company: {hiddenMail.company}</span>
              <br />
              <span>Interest: {hiddenMail.interest}</span>
              <br />
              <span>Budget: {hiddenMail.budget}</span>
              <br />
              <span>Source: {hiddenMail.source}</span>
              <br />
              <span>Message: {hiddenMail.message}</span>
            </Modal>
            <Modal
                maxHeight="650px"
                maxWidth="800px"
                show={modalState.compose}
                key="lmodalcompose"
                buttonVariant="btn btn-primary"
                title="Compose"
                buttonName="Send"
                processing={processing}
                onSubmit={submitCompose}
                onClose={() => { setModalState({ ...modalState, compose: !modalState.compose }); reset(); clearErrors() }}
            >
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-email">Email</label>
                    <div className="input-group input-group-merge">
                        <input
                            value={data.email} onChange={(e) => setData('email', e.target.value)}
                            type="text" id="basic-default-email" className="form-control"
                            placeholder="john.doe" aria-label="john.doe"
                            aria-describedby="basic-default-email2" />
                        <span className="input-group-text" id="basic-default-email2">@example.com</span>
                    </div>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-Subject">Subject</label>
                    <input
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-default-Subject"
                        placeholder="Subject"
                    />
                    {errors.subject && <span className="text-danger">{errors.subject}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-message">Message</label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        rows={5}
                        id="basic-default-message"
                        className="form-control"
                        placeholder="Hi, Do you have a moment to talk Joe?">
                    </textarea>
                    {errors.message && <span className="text-danger">{errors.message}</span>}
                </div>
            </Modal>
            <Modal
                maxHeight="650px"
                maxWidth="800px"
                show={modalState.reply}
                key="lmodalreply"
                buttonVariant="btn btn-primary"
                title="Reply"
                buttonName="Send"
                onSubmit={submitReply}
                processing={processing}
                onClose={() => { setModalState({ ...modalState, reply: !modalState.reply }); reset(); clearErrors() }}
            >
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-email">Email</label>
                    <div className="input-group input-group-merge">
                        <input
                            value={data.email} onChange={(e) => setData('email', e.target.value)}
                            type="text" id="basic-default-email" className="form-control"
                            placeholder="john.doe" aria-label="john.doe"
                            aria-describedby="basic-default-email2" />
                        <span className="input-group-text" id="basic-default-email2">@example.com</span>
                    </div>
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-Subject">Subject</label>
                    <input
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        type="text"
                        className="form-control"
                        id="basic-default-Subject"
                        placeholder="Subject"
                    />
                    {errors.subject && <span className="text-danger">{errors.subject}</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-message">Message</label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        rows={5}
                        id="basic-default-message"
                        className="form-control"
                        placeholder="Hi, Do you have a moment to talk Joe?">
                    </textarea>
                    {errors.message && <span className="text-danger">{errors.message}</span>}
                </div>
            </Modal>
            <div className="app-email card">
                <div className="border-0">
                    <div className="row g-0">
                        <div className="col app-email-sidebar border-end flex-grow-0" id="app-email-sidebar">
                            <div className="btn-compost-wrapper d-grid">
                                <button onClick={() => setModalState({ ...modalState, compose: !modalState.compose })} className="btn btn-success">Compose</button>
                            </div>
                            <div className="email-filters py-2 ps">
                                <ul className="email-filter-folders list-unstyled pb-1">
                                    <li className="active d-flex justify-content-between" data-target="inbox">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-envelope"></i>
                                            <span className="align-middle ms-2">Inbox</span>
                                        </a>
                                        <div className="badge bg-label-primary rounded-pill">21</div>
                                    </li>
                                    <li className="d-flex" data-target="sent">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-send"></i>
                                            <span className="align-middle ms-2">Sent</span>
                                        </a>
                                    </li>
                                    <li className="d-flex justify-content-between" data-target="draft">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-edit"></i>
                                            <span className="align-middle ms-2">Draft</span>
                                        </a>
                                        <div className="badge bg-label-warning rounded-pill">1</div>
                                    </li>
                                    <li className="d-flex" data-target="starred">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-star"></i>
                                            <span className="align-middle ms-2">Starred</span>
                                        </a>
                                    </li>
                                    <li className="d-flex justify-content-between" data-target="spam">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-error-circle"></i>
                                            <span className="align-middle ms-2">Spam</span>
                                        </a>
                                        <div className="badge bg-label-danger rounded-pill">6</div>
                                    </li>
                                    <li className="d-flex align-items-center" data-target="trash">
                                        <a href="#" className="d-flex flex-wrap align-items-center">
                                            <i className="bx bx-trash-alt"></i>
                                            <span className="align-middle ms-2">Trash</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="email-filter-labels">
                                    <small className="mx-4 text-uppercase text-muted">Labels</small>
                                    <ul className="list-unstyled mb-0">
                                        <li data-target="work">
                                            <a href="#">
                                                <i className="badge badge-dot bg-success"></i>
                                                <span className="align-middle ms-2">Work</span>
                                            </a>
                                        </li>
                                        <li data-target="company">
                                            <a href="#">
                                                <i className="badge badge-dot bg-primary"></i>
                                                <span className="align-middle ms-2">Company</span>
                                            </a>
                                        </li>
                                        <li data-target="important">
                                            <a href="#">
                                                <i className="badge badge-dot bg-warning"></i>
                                                <span className="align-middle ms-2">Important</span>
                                            </a>
                                        </li>
                                        <li data-target="private">
                                            <a href="#">
                                                <i className="badge badge-dot bg-danger"></i>
                                                <span className="align-middle ms-2">Private</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col app-emails-list">
                            <div className="card shadow-none border-0">
                                <div className="card-body emails-list-header p-3 py-lg-3 py-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center w-100">
                                            <i className="bx bx-menu bx-sm cursor-pointer d-block d-lg-none me-3"
                                                data-bs-toggle="sidebar" data-target="#app-email-sidebar"
                                                data-overlay=""></i>
                                            <div className="mb-0 mb-lg-2 w-100">
                                                <div className="input-group input-group-merge shadow-none">
                                                    <span className="input-group-text border-0 ps-0 py-0"
                                                        id="email-search">
                                                        <i className="bx bx-search fs-4 text-muted"></i>
                                                    </span>
                                                    <input
                                                        onChange={handleSearchChange}
                                                        type="text"
                                                        className="form-control email-search-input border-0 py-0"
                                                        placeholder="Search mail" aria-label="Search..."
                                                        aria-describedby="email-search" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-0 mb-md-2">
                                            <i onClick={() => window.location.reload()}
                                                className="bx bx-refresh scaleX-n1-rtl cursor-pointer email-refresh me-2 bx-sm text-muted"></i>
                                            <div className="dropdown">
                                                <button className="btn p-0" type="button" id="emailsActions"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i className="bx bx-dots-vertical-rounded bx-sm text-muted"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="emailsActions">
                                                    <a className="dropdown-item" href="#">Mark as
                                                        read</a>
                                                    <a className="dropdown-item" href="#">Mark as
                                                        unread</a>
                                                    <a className="dropdown-item" href="#">Delete</a>
                                                    <a className="dropdown-item" href="#">Archive</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mx-n3 emails-list-header-hr" />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center"></div>
                                        <div
                                            className="email-pagination d-sm-flex d-none align-items-center flex-wrap justify-content-between justify-sm-content-end">
                                            <span className="d-sm-block d-none mx-3 text-muted">{mails.from}-{mails.per_page} of {mails.total}</span>
                                            <i onClick={() => router.get(mails.prev_page_url)}
                                                className="email-prev bx bx-chevron-left scaleX-n1-rtl cursor-pointer  me-4 fs-4"></i>
                                            <i onClick={() => router.get(mails.next_page_url)}
                                                className="email-next bx bx-chevron-right scaleX-n1-rtl cursor-pointer fs-4"></i>
                                        </div>
                                    </div>
                                </div>
                                <hr className="container-m-nx m-0" />
                                <div className="email-list pt-0 ps ps--active-y">
                                    {mails.data.map((mail, index) => (
                                        <ul key={index} className="list-unstyled m-0">
                                            <li className="email-list-item email-marked-read" data-starred="true"
                                                data-bs-toggle="sidebar" data-target="#app-email-view">
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check">
                                                        <input className="email-list-item-input form-check-input"
                                                            type="checkbox" />

                                                    </div>
                                                    <i className="email-list-item-bookmark bx bx-star d-sm-inline-block d-none cursor-pointer mx-4 bx-sm"></i>
                                                    <img
                                                        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template/demo/assets/img/avatars/1.png"
                                                        alt="user-avatar"
                                                        className="d-block flex-shrink-0 rounded-circle me-sm-3 me-0"
                                                        height="32" width="32" />
                                                    <div className="email-list-item-content ms-2 ms-sm-0 me-2">
                                                        <span
                                                            className="email-list-item-username me-2 h6">{mail.fullname}</span>
                                                        <span
                                                            className="email-list-item-subject d-xl-inline-block d-block">{mail.message ? printShorterString(mail.message, 75) : 'No Message Was Included With The Email'}</span>
                                                    </div>
                                                    <div
                                                        className="email-list-item-meta ms-auto d-flex align-items-center">

                                                        <small
                                                            className="email-list-item-time text-muted">{formatTime(mail.created_at)}</small>
                                                        <ul className="list-inline email-list-item-actions">
                                                            <li onClick={() => showAlert(mail.fullname, mail.id)}
                                                                className="list-inline-item email-delete"><i
                                                                    className="bx bx-trash-alt fs-4"></i></li>
                                                            <li onClick={() => { setModalState({ ...modalState, reply: !modalState.reply }); setData('email', mail.email); setHiddenMail(mail) }} className="list-inline-item email-read"><i
                                                                className="bx bx-envelope fs-4"></i></li>
                                                            <li onClick={() => { setModalState({ ...modalState, detail: !modalState.detail }); setHiddenMail(mail) }}
                                                                className="list-inline-item"><i
                                                                    className="bx bx-error-circle fs-4"></i></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    ))}

                                    <ul className="list-unstyled m-0">
                                        <li className="email-list-empty text-center d-none">No items found.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="app-overlay"></div>
                        </div>
                        <div className="col app-email-view flex-grow-0 bg-body" id="app-email-view">
                            <div className="app-email-view-header p-3 py-md-3 py-2 rounded-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center overflow-hidden">
                                        <i className="bx bx-chevron-left bx-sm cursor-pointer me-2"
                                            data-bs-toggle="sidebar" data-target="#app-email-view"></i>
                                        <h6 className="text-truncate mb-0 me-2">Focused impactful open issues</h6>
                                        <span className="badge bg-label-warning">Important</span>
                                    </div>
                                    <div className="d-flex">
                                        <i className="bx bx-printer d-sm-block d-none fs-4"></i>
                                        <div className="dropdown ms-3">
                                            <button className="btn p-0" type="button" id="dropdownMoreOptions"
                                                data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bx bx-dots-vertical-rounded fs-4"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="dropdownMoreOptions">
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-envelope-open bx-xs me-1"></i>
                                                    <span className="align-middle">Mark as unread</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-envelope-open bx-xs me-1"></i>
                                                    <span className="align-middle">Mark as unread</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-star bx-xs me-1"></i>
                                                    <span className="align-middle">Add star</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-calendar bx-xs me-1"></i>
                                                    <span className="align-middle">Create Event</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-volume-mute bx-xs me-1"></i>
                                                    <span className="align-middle">Mute</span>
                                                </a>
                                                <a className="dropdown-item d-sm-none d-block"
                                                    href="#">
                                                    <i className="bx bx-printer bx-xs me-1"></i>
                                                    <span className="align-middle">Print</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="app-email-view-hr mx-n3 mb-2" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="bx bx-trash-alt cursor-pointer me-3 fs-4"
                                            data-bs-toggle="sidebar" data-target="#app-email-view"></i>
                                        <i className="bx bx-envelope fs-4 cursor-pointer me-3"></i>
                                        <div className="dropdown">
                                            <button className="btn p-0" type="button" id="dropdownMenuFolderTwo"
                                                data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bx bx-folder fs-4 me-3"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="dropdownMenuFolderTwo">
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-error-circle me-1"></i>
                                                    <span className="align-middle">Spam</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-edit me-1"></i>
                                                    <span className="align-middle">Draft</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="bx bx-trash-alt me-1"></i>
                                                    <span className="align-middle">Trash</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <button className="btn p-0" type="button" id="dropdownLabelTwo"
                                                data-bs-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i className="bx bx-label fs-4 me-3"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="dropdownLabelTwo">
                                                <a className="dropdown-item" href="#">
                                                    <i className="badge badge-dot bg-success me-1"></i>
                                                    <span className="align-middle">Workshop</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="badge badge-dot bg-primary me-1"></i>
                                                    <span className="align-middle">Company</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="badge badge-dot bg-warning me-1"></i>
                                                    <span className="align-middle">Important</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap justify-content-end">
                                        <span className="d-sm-block d-none mx-3 text-muted">1-10 of 653</span>
                                        <i className="bx bx-chevron-left scaleX-n1-rtl cursor-pointer text-muted me-4 fs-4"></i>
                                        <i className="bx bx-chevron-right scaleX-n1-rtl cursor-pointer fs-4"></i>
                                    </div>
                                </div>
                            </div>
                            <hr className="m-0" />
                            <div className="app-email-view-content py-4 ps ps--active-y">
                                <p className="email-earlier-msgs text-center text-muted cursor-pointer mb-5">1
                                    Earlier Message</p>
                                <div className="card email-card-prev mx-sm-4 mx-3 border">
                                    <div
                                        className="card-header d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="d-flex align-items-center mb-sm-0 mb-3">
                                            <img
                                                src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template/demo/assets/img/avatars/2.png"
                                                alt="user-avatar" className="flex-shrink-0 rounded-circle me-2"
                                                height="38" width="38" />
                                            <div className="flex-grow-1 ms-1">
                                                <h6 className="m-0">Ross Geller</h6>
                                                <small className="text-muted">rossGeller@email.com</small>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <small className="mb-0 me-3 text-muted">June 20th 2020, 08:30 AM</small>
                                            <i className="bx bx-paperclip cursor-pointer me-2 bx-sm"></i>
                                            <i className="email-list-item-bookmark bx bx-star cursor-pointer me-2 bx-sm"></i>
                                            <div className="dropdown me-3">
                                                <button className="btn p-0" type="button" id="dropdownEmailOne"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i className="bx bx-dots-vertical-rounded bx-sm"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="dropdownEmailOne">
                                                    <a className="dropdown-item scroll-to-reply"
                                                        href="#">
                                                        <i className="bx bx-share me-1"></i>
                                                        <span className="align-middle">Reply</span>
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        <i className="bx bx-share scaleX-n1 scaleX-n1-rtl me-1"></i>
                                                        <span className="align-middle">Forward</span>
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        <i className="bx bx-info-circle me-1"></i>
                                                        <span className="align-middle">Report</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="fw-medium">Greetings!</p>
                                        <p>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content
                                            of a
                                            page when looking at its layout.The point of using Lorem Ipsum is that
                                            it has a
                                            more-or-less
                                            normal distribution of letters, as opposed to using 'Content here,
                                            content here',making
                                            it
                                            look like readable English.
                                        </p>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have
                                            suffered alteration in some form, by injected humour, or randomised
                                            words which don't
                                            look
                                            even slightly believable.
                                        </p>
                                        <p className="mb-0">Sincerely yours,</p>
                                        <p className="fw-medium mb-0">Envato Design Team</p>
                                        <hr />
                                        <p className="mb-2">Attachments</p>
                                        <div className="cursor-pointer">
                                            <i className="bx bx-file"></i>
                                            <span className="align-middle ms-1">report.xlsx</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card email-card-last mx-sm-4 mx-3 mt-4 border">
                                    <div
                                        className="card-header d-flex justify-content-between align-items-center flex-wrap border-bottom">
                                        <div className="d-flex align-items-center mb-sm-0 mb-3">
                                            <img
                                                src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template/demo/assets/img/avatars/1.png"
                                                alt="user-avatar" className="flex-shrink-0 rounded-circle me-2"
                                                height="38" width="38" />
                                            <div className="flex-grow-1 ms-1">
                                                <h6 className="m-0">Chandler Bing</h6>
                                                <small className="text-muted">iAmAhoot@email.com</small>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <small className="mb-0 me-3 text-muted">June 20th 2020, 08:10 AM</small>
                                            <i className="bx bx-paperclip cursor-pointer me-2 bx-sm"></i>
                                            <i className="email-list-item-bookmark bx bx-star cursor-pointer me-2 bx-sm"></i>
                                            <div className="dropdown me-3">
                                                <button className="btn p-0" type="button" id="dropdownEmailTwo"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i className="bx bx-dots-vertical-rounded bx-sm"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-end"
                                                    aria-labelledby="dropdownEmailTwo">
                                                    <a className="dropdown-item scroll-to-reply"
                                                        href="#">
                                                        <i className="bx bx-share me-1"></i>
                                                        <span className="align-middle">Reply</span>
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        <i className="bx bx-share me-1 scaleX-n1 scaleX-n1-rtl"></i>
                                                        <span className="align-middle">Forward</span>
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        <i className="bx bx-info-circle me-1"></i>
                                                        <span className="align-middle">Report</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body pt-3">
                                        <p className="fw-medium">Hey John,</p>
                                        <p>
                                            It is a long established fact that a reader will be distracted by the
                                            readable content
                                            of a
                                            page when looking at its layout.The point of using Lorem Ipsum is that
                                            it has a
                                            more-or-less
                                            normal distribution of letters, as opposed to using 'Content here,
                                            content here',making
                                            it
                                            look like readable English.
                                        </p>
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the
                                            majority have
                                            suffered alteration in some form, by injected humour, or randomised
                                            words which don't
                                            look
                                            even slightly believable.
                                        </p>
                                        <p className="mb-0">Sincerely yours,</p>
                                        <p className="fw-medium mb-0">Envato Design Team</p>
                                        <hr />
                                        <p className="mb-2">Attachments</p>
                                        <div className="cursor-pointer">
                                            <i className="bx bx-file"></i>
                                            <span className="align-middle ms-1">report.xlsx</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="email-reply card mt-4 mx-sm-4 mx-3 border">
                                    <h6 className="card-header border-0">Reply to Ross Geller</h6>
                                    <div className="card-body pt-0 px-3">
                                        <div className="d-flex justify-content-start">
                                            <div
                                                className="email-reply-toolbar border-0 w-100 ps-0 ql-toolbar ql-snow">
                                                <span className="ql-formats me-0">
                                                    <button className="ql-bold" type="button"><svg viewBox="0 0 18 18"> <path className="ql-stroke"
                                                        d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> <path
                                                            className="ql-stroke"
                                                            d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> </svg></button>
                                                    <button className="ql-italic" type="button"><svg viewBox="0 0 18 18"> <line className="ql-stroke"
                                                        x1="7" x2="13" y1="4"
                                                        y2="4"></line> <line
                                                            className="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line> <line className="ql-stroke" x1="8"
                                                                x2="10" y1="14"
                                                                y2="4"></line> </svg></button>
                                                    <button className="ql-underline" type="button"><svg viewBox="0 0 18 18"> <path className="ql-stroke"
                                                        d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path> <rect
                                                            className="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect> </svg></button>
                                                    <button className="ql-list" value="ordered" type="button"><svg viewBox="0 0 18 18"> <line
                                                        className="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="7"
                                                            x2="15" y1="9" y2="9"></line> <line
                                                                className="ql-stroke" x1="7" x2="15" y1="14" y2="14"></line> <line className="ql-stroke ql-thin"
                                                                    x1="2.5" x2="4.5" y1="5.5"
                                                                    y2="5.5"></line> <path
                                                                        className="ql-fill"
                                                                        d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> <path
                                                                            className="ql-stroke ql-thin"
                                                                            d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> <path
                                                                                className="ql-stroke ql-thin"
                                                                                d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg></button>
                                                    <button className="ql-list" value="bullet" type="button"><svg viewBox="0 0 18 18"> <line
                                                        className="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> <line className="ql-stroke" x1="6"
                                                            x2="15" y1="9" y2="9"></line> <line
                                                                className="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line> <line className="ql-stroke" x1="3"
                                                                    x2="3" y1="4" y2="4"></line> <line
                                                                        className="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> <line className="ql-stroke" x1="3"
                                                                            x2="3" y1="14" y2="14"></line> </svg></button>
                                                    <button className="ql-link" type="button"><svg viewBox="0 0 18 18"> <line className="ql-stroke"
                                                        x1="7" x2="11" y1="7"
                                                        y2="11"></line> <path
                                                            className="ql-even ql-stroke"
                                                            d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path
                                                                className="ql-even ql-stroke"
                                                                d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg></button>
                                                    <button className="ql-image" type="button"><svg viewBox="0 0 18 18"> <rect className="ql-stroke"
                                                        height="10" width="12"
                                                        x="3" y="4"></rect> <circle
                                                            className="ql-fill" cx="6" cy="7" r="1"></circle> <polyline className="ql-even ql-fill"
                                                                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg></button>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="email-reply-editor ql-container ql-snow">
                                            <div className="ql-editor ql-blank" data-gramm="false"
                                                data-placeholder="Write your message... ">
                                                <p><br /></p></div>
                                            <div className="ql-clipboard"
                                                tabIndex="-1"></div>
                                            <div className="ql-tooltip ql-hidden"><a className="ql-preview"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href="about:blank"></a><input
                                                    type="text" data-formula="e=mc^2" data-link="https://quilljs.com"
                                                    data-video="Embed URL" /><a className="ql-action"></a><a
                                                    className="ql-remove" /></div>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <div className="cursor-pointer me-3">
                                                <i className="bx bx-paperclip"></i>
                                                <span className="align-middle">Attachments</span>
                                            </div>
                                            <button className="btn btn-primary">
                                                <i className="bx bx-paper-plane me-1"></i>
                                                <span className="align-middle">Send</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}>
                                    <div className="ps__thumb-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div>
                                </div>
                                <div className="ps__rail-y" style={{ top: '0px', height: '474px', right: '0px' }}>
                                    <div className="ps__thumb-y" tabIndex="0"
                                        style={{ top: '0px', height: '301px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
export default InboxIndex;

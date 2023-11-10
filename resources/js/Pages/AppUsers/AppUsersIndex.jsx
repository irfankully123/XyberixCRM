import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';
import { router } from "@inertiajs/react";
import successToast from "@/SweetAlerts/SuccessToast";
import AppUserCards from "@/Components/AppUserCards";
import Modal from "@/Components/Modal";

const AppUsersIndex = ({ users, permissions }) => {

    const [modalState, setModalState] = useState({ assignPermission: false, revokePermission: false });

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        permission: '',
        hiddenId: null,
    })

    const handleAssignPermission = () => {
        post(route('appuser.assign', data.hiddenId), {
            onSuccess: () => {
                successToast('Permission Assigned');
                reset();
                clearErrors();
                setModalState((prevState) => ({ ...prevState, assignPermission: false, revokePermission: false }));
            }
        });
    }

    const handleRevokePermission = () => {
        post(route('appuser.revoke', data.hiddenId), {
            onSuccess: () => {
                successToast('Permission Revoked');
                reset();
                clearErrors();
                setModalState((prevState) => ({ ...prevState, assignPermission: false, revokePermission: false }));
            }
        });
    }

    const handleDelete = (id) => router.delete((route('appuser.destroy', id)));


    const showAlert = (name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You will not be able to recover this ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.value) {
                handleDelete(id);
                successToast('Appuser Deleted Successfully')
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked cancel button
            }
        });
    }

    return (
        <DashboardLayout>
            <AppUserCards></AppUserCards>
            <Modal
                maxHeight="300px"
                maxWidth="500px"
                show={modalState.assignPermission}
                buttonVariant="btn btn-primary"
                title="Assign Permission"
                processing={processing}
                onSubmit={handleAssignPermission}
                buttonName="Assign"
                onClose={() => { setModalState((prevState) => ({ ...prevState, assignPermission: false })); reset(); clearErrors() }}
            >
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <select
                            onChange={(e) => setData((prevState) => ({ ...prevState, permission: e.target.value }))}
                            className="form-select" aria-label="Default select example">
                            <option value="0">Select</option>
                            {permissions && permissions.map((permission, index) => (
                                <option key={index}>{permission.name}</option>
                            ))}
                        </select>
                        <span className="text-danger">{errors.permission}</span>
                    </div>
                </div>
            </Modal>
            <Modal
                maxHeight="300px"
                maxWidth="500px"
                show={modalState.revokePermission}
                buttonVariant="btn btn-danger"
                title="Revoke Permission"
                onSubmit={handleRevokePermission}
                buttonName="Revoke"
                processing={processing}
                onClose={() => { setModalState((prevState) => ({ ...prevState, revokePermission: false })); reset(); clearErrors() }}
            >
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <select
                            onChange={(e) => setData((prevState) => ({ ...prevState, permission: e.target.value }))}
                            className="form-select" aria-label="Default select example">
                            <option value="0">Select</option>
                            {permissions && permissions.map((permission, index) => (
                                <option key={index}>{permission.name}</option>
                            ))}
                        </select>
                        <span className="text-danger">{errors.permission}</span>
                    </div>
                </div>
            </Modal>
            <Head><title>Users</title></Head>
            <div className="card __web-inspector-hide-shortcut__">
                <div className="card-header">
                    <Link href={route('appuser.create')} type="button" className="btn btn-success">Register</Link>
                </div>
                <div className="table-responsive text-nowrap">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>profile</th>
                                <th>name</th>
                                <th>role</th>
                                <th>email</th>
                                <th>status</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {user.profile != null ?
                                            <img src={`/storage/users/${user.profile}`}
                                                alt="userprofile"
                                                className="w-px-40 h-auto rounded-circle" />
                                            :
                                            <img
                                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                                alt="userprofile"
                                                className="w-px-40 h-auto rounded-circle" />
                                        }
                                    </td>
                                    <td>{user.name}</td>
                                    <td>
                                        <span className="text-truncate d-flex align-items-center"><span
                                            className="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30 me-2"><i
                                                className="bx bx-user bx-xs"></i></span>Sales</span>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.active_status ? (<span className="badge bg-label-success">Active</span>) : (<span className="badge bg-label-secondary">Inactive</span>)}</td>
                                    <td>
                                        <div className="d-inline-block text-nowrap">
                                            <button onClick={() => router.get(route('appuser.edit', user.id))} className="btn btn-sm btn-icon"><i className="bx bx-edit"></i></button>
                                            <button onClick={() => showAlert(user.name)} className="btn btn-sm btn-icon delete-record"><i
                                                className="bx bx-trash"></i></button>
                                            <button className="btn btn-sm btn-icon dropdown-toggle hide-arrow"
                                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                                    className="bx bx-dots-vertical-rounded me-2"></i></button>
                                            <div className="dropdown-menu dropdown-menu-end m-0" >
                                                <Link href={route('appuser.show', user.id)} className="dropdown-item">All Permissions</Link>
                                                <a onClick={() => { setModalState((prevState) => ({ ...prevState, assignPermission: true })); setData((prevState) => ({ ...prevState, hiddenId: user.id, permission: '' })) }} href="#" className="dropdown-item">Assign Permission</a>
                                                <a onClick={() => { setModalState((prevState) => ({ ...prevState, revokePermission: true })); setData((prevState) => ({ ...prevState, hiddenId: user.id, permission: '' })) }} href="#" className="dropdown-item">Revoke Permission</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default AppUsersIndex;

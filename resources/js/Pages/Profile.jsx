import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import successToast from "@/SweetAlerts/SuccessToast.js";
import { Head, useForm, usePage } from "@inertiajs/react";
import UploadImageInput from "@/Components/UploadImageInput.jsx";
import InputPassword from "@/Components/InputPassword.jsx";
import SpinnerButton from "@/Components/SpinnerButton.jsx";

const Profile = () => {

    const { auth } = usePage().props;

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        profile: null,
        name: auth.user.name,
        email: auth.user.email,
        new_password: '',
        old_password: '',
        confirm_password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.update', auth.user.id), {
            onSuccess: () => {
                successToast('Changes Saved Successfully');
                reset();
                clearErrors();
                window.location.href = '/dashboard/profile';
            }
        });
    }


    return (
        <DashboardLayout>
            <Head><title>Profile</title></Head>
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Profile</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <UploadImageInput
                                image={auth.user.profile}
                                error={errors.profile}
                                path={`/storage/users/${auth.user.profile}`}
                                onImage={(v) => setData((prevState) => ({ ...prevState, profile: v }))}
                            >
                            </UploadImageInput>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <div className="input-group input-group-merge">
                                <span className="input-group-text"><i className='bx bxs-user'></i></span>
                                <input
                                    className="form-control"
                                    placeholder="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData((prevData) => ({ ...prevData, name: e.target.value }))}
                                />
                            </div>
                            <span className="text-danger">{errors.name}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <div className="input-group input-group-merge">
                                <span className="input-group-text"><i className='bx bxs-envelope'></i></span>
                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
                                />
                            </div>
                            <span className="text-danger">{errors.email}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Old Password</label>
                            <div className="input-group input-group-merge">
                                <InputPassword id="old_password"
                                    name="old_password"
                                    passwordValue={data.old_password}
                                    onValueChange={(v) => setData((prevData) => ({ ...prevData, old_password: v }))}>
                                </InputPassword>
                            </div>
                            <span className="text-danger">{errors.old_password}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <div className="input-group input-group-merge">
                                <InputPassword id="new_password"
                                    name="new_password"
                                    passwordValue={data.new_password}
                                    onValueChange={(v) => setData((prevData) => ({ ...prevData, new_password: v }))}>
                                </InputPassword>
                            </div>
                            <span className="text-danger">{errors.new_password}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="input-group input-group-merge">
                                <InputPassword id="confirm_password"
                                    name="confirm_password"
                                    passwordValue={data.confirm_password}
                                    onValueChange={(v) => setData((prevData) => ({ ...prevData, confirm_password: v }))}>
                                </InputPassword>
                            </div>
                            <span className="text-danger">{errors.confirm_password}</span>
                        </div>
                        <div className="text-end">
                            <SpinnerButton btnClass="btn btn-primary" handleClick={handleSubmit} processing={processing}>Saved</SpinnerButton>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Profile;

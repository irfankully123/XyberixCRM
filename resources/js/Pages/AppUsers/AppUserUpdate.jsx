import UploadImageInput from "@/Components/UploadImageInput.jsx";
import { Link, useForm, Head } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import InputPassword from "@/Components/InputPassword.jsx";
import SpinnerButton from "@/Components/SpinnerButton.jsx";

const AppUserUpdate = ({ user, errors }) => {

    const { data, setData, post, reset, clearErrors, processing } = useForm({
        profile: null,
        name: user.name,
        email: user.email,
        password: '',
        confirm_password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('appuser.update', user.id), {
            onSuccess: () => {
                successToast('Changes Saved Successfully');
                reset();
                clearErrors();
            }
        });
    }


    return (
        <DashboardLayout>
            <Head><title>Update Form</title></Head>
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{user.name}</h5>
                        <h5 className="float-end">
                            <Link href={route('appuser.index')}>Back</Link>
                        </h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <UploadImageInput
                                    onImage={(v) => setData((prevState) => ({ ...prevState, profile: v }))}
                                    image={user.profile}
                                    path={`/storage/users/${user.profile}`}
                                    error={errors.profile}>
                                </UploadImageInput>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Name</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className='bx bxs-user'></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="name"
                                        id="name"
                                        autoComplete="true"
                                        value={data.name}
                                        onChange={(e) => setData((prevState) => ({ ...prevState, name: e.target.value }))}
                                    />
                                </div>
                                <span className="text-danger">{errors.name}</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className='bx bxs-envelope'></i></span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="email"
                                        id="email"
                                        autoComplete="true"
                                        value={data.email}
                                        onChange={(e) => setData((prevState) => ({ ...prevState, email: e.target.value }))}
                                    />
                                    <span className="input-group-text">@example.com</span>
                                </div>
                                <span className="text-danger">{errors.email}</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <div className="input-group input-group-merge">
                                    <InputPassword
                                        id="password"
                                        name="password"
                                        passwordValue={data.password}
                                        onValueChange={(v) => setData((prevState) => ({ ...prevState, password: v }))}>
                                    </InputPassword>
                                </div>
                                <span className="text-danger">{errors.password}</span>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                <div className="input-group input-group-merge">
                                    <InputPassword
                                        id="confirm_password"
                                        name="confirm_password"
                                        passwordValue={data.confirm_password}
                                        onValueChange={(v) => setData((prevState) => ({ ...prevState, confirm_password: v }))}>
                                    </InputPassword>
                                </div>
                                <span className="text-danger">{errors.confirm_password}</span>
                            </div>
                            <div className="text-end">
                                <SpinnerButton btnClass="btn btn-primary" processing={processing}>Save</SpinnerButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
export default AppUserUpdate;

import InputPassword from "@/Components/InputPassword.jsx";
import {Head} from "@inertiajs/react";
import {useForm} from '@inertiajs/react'

const Login = () => {

    const {data, setData, post, processing, errors} = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <>
            <Head><title>Login</title></Head>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <div className="app-brand justify-content-center">
                                    <img
                                        src='logo.svg'
                                        alt="web-logo"
                                        className="img-fluid"
                                        style={{height: '100px', width: '100px'}}
                                    />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email or Username
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email or username"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                autoFocus
                                            />
                                            {errors.email && <span className="text-danger">{errors.email}</span>}
                                        </div>
                                        <div className="mb-3 form-password-toggle">
                                            <div className="d-flex justify-content-between">
                                                <label className="form-label" htmlFor="password">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="input-group input-group-merge">
                                                <InputPassword
                                                    name="password"
                                                    id="password"
                                                    passwordValue={data.password}
                                                    onValueChange={(value) => setData('password', value)}>
                                                </InputPassword>
                                                {errors.password && <span className="text-danger" >{errors.password}</span>}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <button
                                                className="btn btn-primary d-grid w-100"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

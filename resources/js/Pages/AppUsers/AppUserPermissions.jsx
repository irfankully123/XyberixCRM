import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

const AppUserPermissions = ({ permissions, user_name }) => {
    return (
        <DashboardLayout>
            <div className="card __web-inspector-hide-shortcut__">
                <div className="card-header">
                    <h5 className="float-end">
                        <Link href={route('appuser.index')} type="button" className="btn btn-dark">Back</Link>
                    </h5>
                    <h5>{user_name}</h5>
                </div>
                <div className="table-responsive text-nowrap">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>guard</th>
                                <th>created_at</th>
                                <th>updated_at</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {
                                permissions.map((permission, index) => (
                                    <tr key={index}>
                                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>{index + 1}</strong></td>
                                        <td>{permission.name}</td>
                                        <td>web</td>
                                        <td>{permission.created_at}</td>
                                        <td>{permission.updated_at}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    )
}
export default AppUserPermissions;

import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import {Head} from "@inertiajs/react";
import SalesChart from "@/Components/SalesChart";
import TransactionChart from "@/Components/TransactionChart";
const Home = () => {
    return (
        <DashboardLayout>
            <Head><title>Home</title></Head>
            <div className="row">
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img src="/dashboard/assets/img/icons/unicons/chart-success.png" alt="chart"
                                         className="rounded"/>
                                </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">Profit</span>
                            <h3 className="card-title mb-2">500$</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img src="/dashboard/assets/img/icons/unicons/wallet-info.png" alt="wallet"
                                         className="rounded"/>
                                </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">Sales</span>
                            <h3 className="card-title mb-2">600$</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img src="/dashboard/assets/img/icons/unicons/paypal.png" alt="paypal"
                                         className="rounded"/>
                                </div>
                            </div>
                            <span className="d-block mb-1">Payments</span>
                            <h3 className="card-title text-nowrap mb-2">700$</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img src="/dashboard/assets/img/icons/unicons/cc-primary.png" alt="transaction"
                                         className="rounded"/>
                                </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">Transactions</span>
                            <h3 className="card-title mb-2">1000$</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <SalesChart></SalesChart>
                </div>
                <div className="col-lg-6">
                    <TransactionChart></TransactionChart>
                </div>
            </div>
        </DashboardLayout>
    );
}
export default Home;

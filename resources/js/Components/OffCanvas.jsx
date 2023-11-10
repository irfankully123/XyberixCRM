const OffcanvasComponent = ({notifications = [], handleDelete, clear}) => {

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


    return (
        <>
            <div
                className="offcanvas offcanvas-end"
                data-bs-scroll="true"
                tabIndex="-1"
                id="offcanvasBoth"
                aria-labelledby="offcanvasBothLabel"
                style={{visibility: 'hidden'}}
                aria-modal="true"
                role="dialog"
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasBothLabel" className="offcanvas-title">
                        <button
                            onClick={clear}
                            type="button"
                            style={{border: 'none', background: 'none', padding: 0, cursor: 'pointer'}}>Notification
                        </button>
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body my-auto mx-0 flex-grow-0">
                    <div className="toast-container">
                        {
                            notifications && notifications.map((notification, index) => (

                                <div key={index} className="bs-toast toast fade show bg-primary" role="alert"
                                     aria-live="assertive"
                                     aria-atomic="true">
                                    <div className="toast-header">
                                        <i className="bx bx-bell me-2"></i>
                                        <div className="me-auto fw-semibold">{notification.title}</div>
                                        <small>{formatTime(notification.created_at)}</small>
                                        <button
                                            onClick={() => handleDelete(notification.id)}
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close">
                                        </button>
                                    </div>
                                    <div className="toast-body">
                                        {printShorterString(notification.body, 50)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default OffcanvasComponent;

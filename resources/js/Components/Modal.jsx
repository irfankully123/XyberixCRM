import SpinnerButton from "@/Components/SpinnerButton.jsx";
import '../modal.css';

const Modal = ({ show, title, onClose, children, onSubmit, processing, buttonVariant, buttonName, maxHeight, maxWidth }) => {
    return show && (
        <div  className="modal">
            <div className="modal-overlay"></div>
            <div className="modal-content" style={{ maxHeight: maxHeight, maxWidth: maxWidth }}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button onClick={onClose} type="button" className="btn-close"></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {
                    buttonName && (
                        <div className="modal-footer">
                            <SpinnerButton btnClass={buttonVariant} handleClick={onSubmit} processing={processing}>{buttonName}</SpinnerButton>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Modal;


const SpinnerButton = ({ processing, children, handleClick, btnClass }) => {
    return (
        <button onClick={handleClick} type="submit" className={processing ? `text-white-50 ${btnClass}` : btnClass} disabled={processing}>
            {processing && (
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            {children}
        </button>
    );
}
export default SpinnerButton;

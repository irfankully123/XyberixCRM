
const Pagination = ({ pagelinks = [], activeLink, last_page, moveToLastPage, moveToFirstPage, moveToNextPage, moveToPrePage }) => {

    const links = pagelinks.map((link, index) => {
        if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
            return null;
        }
        return (
            <li key={index} className={link.active ? 'page-item active' : 'page-item'}>
                <button type="button" onClick={() => activeLink(parseInt(link.label, 10))} className="page-link">
                    {link.label}
                </button>
            </li>
        );
    });

    return (
        <>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <div className="demo-inline-spacing">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item first">
                                    <button onClick={() => moveToFirstPage()} className="page-link" ><i className="tf-icon bx bx-chevrons-left"></i></button>
                                </li>
                                <li>
                                    <button onClick={() => moveToPrePage()} className="page-link" >Previous</button>
                                </li>
                                {links}
                                <li>
                                    <button onClick={() => moveToNextPage()} className="page-link" >Next</button>
                                </li>
                                <li className="page-item last">
                                    <button onClick={() => moveToLastPage(last_page)} className="page-link" ><i className="tf-icon bx bx-chevrons-right"></i></button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );

}
export default Pagination;

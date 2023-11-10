import {Link} from "@inertiajs/react";

const Pagination = ({links, firstPageUrl, lastPageUrl, lastPageCheck}) => {
    const checkingPageCount = lastPageCheck > 1;
    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <div className="demo-inline-spacing">
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            {checkingPageCount && (
                                <li className="page-item first">
                                    <a className="page-link" href={firstPageUrl}>
                                        <i className="tf-icon bx bx-chevrons-left"></i>
                                    </a>
                                </li>
                            )}
                            {links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${link.active ? 'active' : ''}`}
                                >
                                    {link.url !== null ? (
                                        <Link className="page-link" href={link.url}
                                           dangerouslySetInnerHTML={{__html: link.label}}></Link>
                                    ) : (
                                        <span className="page-link"
                                              dangerouslySetInnerHTML={{__html: link.label}}></span>
                                    )}
                                </li>
                            ))}
                            {checkingPageCount && (
                                <li className="page-item last">
                                    <a className="page-link" href={lastPageUrl}>
                                        <i className="tf-icon bx bx-chevrons-right"></i>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination

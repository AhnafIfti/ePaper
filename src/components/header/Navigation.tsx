import React, {useState} from 'react';
import { Link } from 'react-router-dom'

const Navigate = () => {
    const [getNav, setNav] = useState({
        menu: false,
        isOpen: false,
        itemLinkClass: "nav-item nav-link",
    });
    
    const toggleMenu = () => {
        setNav({
            ...getNav,
            menu: !getNav.menu
        });
    };
    
    const show = getNav.menu ? "show" : "";
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
                <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={"collapse navbar-collapse " + show}>
                    <div className="navbar-nav container">
                        <Link
                            className={getNav.itemLinkClass}
                            to="/email"
                            onClick={() =>
                            getNav.itemLinkClass === "nav-item nav-link"
                                ? "nav-item nav-link active"
                                : "nav-item nav-link"
                            }
                        >
                            Most Emailed
                        </Link>
                        <Link
                            className={getNav.itemLinkClass}
                            to="/share"
                            onClick={() =>
                            getNav.itemLinkClass === "nav-item nav-link"
                                ? "nav-item nav-link active"
                                : "nav-item nav-link"
                            }
                        >
                            Most Shared
                        </Link>
                        <Link
                            className={getNav.itemLinkClass}
                            to="/view"
                            onClick={() =>
                            getNav.itemLinkClass === "nav-item nav-link"
                                ? "nav-item nav-link active"
                                : "nav-item nav-link"
                            }
                        >
                            Most Viewed
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigate;
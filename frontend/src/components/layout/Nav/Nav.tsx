// Navigation component that lets users use hyperlinks to go between app pages.

import { NavLink } from "react-router-dom";

export function Nav() {
    return(
        <nav>
            <div className="page-links">
                <NavLink to="/equipment">Equipment</NavLink>
                <NavLink to="/user">Users</NavLink>
                <NavLink to="/reviews">Reviews</NavLink>
            </div>
        </nav>
    )
}

export default Nav
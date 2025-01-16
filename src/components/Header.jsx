import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <h1>Which Element Are You?</h1>
            <h4>(based on completely random things)</h4>
       <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
       </nav>
       </header>
    );
};
export default Header;
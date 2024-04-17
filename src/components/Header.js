import React from 'react';
import homeLogo from '../assets/images/home.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={homeLogo} alt="Logo" />
                </Link>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/new-law">Crie Sua Lei</Link>
                <Link to="/new-user">Cadastro</Link>
            </nav>
        </header>
    );
};

export default Header;


export function HeaderOnBoarding() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={homeLogo} alt="Logo" />
                </Link>
            </div>

        </header>
    );
}

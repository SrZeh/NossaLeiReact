import React from 'react';
import homeLogo from '../assets/images/home.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={homeLogo} alt="Logo" />
            </div>
            <nav>
                <a href="#">Home</a>
                <a href="#">Crie Sua Lei</a>
                <a href="#">Cadastro</a>
            </nav>
        </header>
    );
};

export default Header;

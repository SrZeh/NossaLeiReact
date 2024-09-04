// import React from 'react';
// import homeLogo from '../assets/images/home.png';
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../context/AuthContext';

// const Header = () => {
//     const { currentUser, logout } = useAuth();
//     const navigate = useNavigate(); // useNavigate para redirecionamento

//     const handleLogout = async () => {
//         try {
//             await logout(); // Executa a função de logout
//             navigate("/"); // Redireciona para a página inicial
//         } catch (error) {
//             console.error("Failed to log out", error);
//         }
//     };

//     return (
//         <header className="header">
//             <div className="logo">
//                 <Link to="/law-list">
//                     <img src={homeLogo} alt="Logo" />
//                 </Link>
//             </div>
//             <nav>
                
//                 {/* <Link to="/">Home</Link> */}
//                 <Link to="/law-list">Propostas de Leis</Link>
//                 <Link to="/new-law">Crie Sua Lei</Link>
//                 <Link to="/news">Notícias</Link>
                
//                 {currentUser ? (
//                     <>
//                         <span>Bem-vindo, {currentUser.email}</span>
//                         <button onClick={handleLogout} style={{ cursor: 'pointer', margin: 20 }}>Logout</button>
//                     </>
//                 ) : (
//                     <Link to="/new-user">Cadastro</Link>
//                 )}
//             </nav>
//         </header>
//     );
// };

// export default Header;

// export function HeaderOnBoarding() {
//     return (
//         <header className="header">
//             <div className="logo">
//                 <Link to="/">
//                     <img src={homeLogo} alt="Logo" />
//                 </Link>
//             </div>
//         </header>
//     );
// }


import React from 'react';
import homeLogo from '../assets/images/home.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate(); // useNavigate para redirecionamento

    const handleLogout = async () => {
        try {
            await logout(); // Executa a função de logout
            navigate("/"); // Redireciona para a página inicial
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/law-list">
                    <img src={homeLogo} alt="Logo" />
                </Link>
            </div>
            <nav className="nav-links">
                <Link to="/law-list">Propostas de Leis</Link>
                <Link to="/new-law">Crie Sua Lei</Link>
                <Link to="/news">Notícias</Link>
                {currentUser ? (
                    <>
                        <span>Bem-vindo, {currentUser.email}</span>
                        <button onClick={handleLogout} style={{ cursor: 'pointer', margin: 20 }}>Logout</button>
                    </>
                ) : (
                    <Link to="/new-user">Cadastro</Link>
                )}
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

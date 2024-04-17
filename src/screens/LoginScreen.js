import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderOnBoarding } from "../components/Header";

export default function LoginScreen() {
    const navigate = useNavigate();

    const handleEntrarClick = () => {

        navigate("/new-law");
    };

    return (
        <div>
            <HeaderOnBoarding />
            <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
                <div>
                    <h1>Bem vindo ao Nossa Lei</h1>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginBottom: '5px' }}>Digite seu e-mail</label>
                            <input type="email" placeholder="Digite seu email" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginBottom: '5px' }}>Senha</label>
                            <input type="password" placeholder="Digite sua senha" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                            <Link to="/forgot-password" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'none' }}>Esqueci minha senha?</Link>                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <button type="button" onClick={handleEntrarClick} style={{ width: 150, height: 60, padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff', fontSize: '20px' }}>Entrar</button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Link to="/new-user" style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#800080', color: '#fff', textDecoration: 'none', fontSize: '20px' }}>Registrar</Link>                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

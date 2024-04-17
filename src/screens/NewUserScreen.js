import React from "react";
import { HeaderOnBoarding } from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function NewUserScreen() {
    const navigate = useNavigate();

    const handleEntrarClick = () => {

        navigate("/");
    };
    return (
        <div>
            <HeaderOnBoarding />
            <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
                <div>
                    <h1>Cadastre seu e-mail e senha no NossaLei</h1>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Digite seu e-mail</label>
                            <input type="email" placeholder="Digite seu email" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Digite sua senha com no mínimo 6 caracteres</label>
                            <input type="password" placeholder="Digite sua senha" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Confirme sua senha</label>
                            <input type="password" placeholder="Confirme sua senha" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        </div>
                        <div>
                            <button onClick={handleEntrarClick} type="submit" style={{ width: 100, height: 60, padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff' }}>Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

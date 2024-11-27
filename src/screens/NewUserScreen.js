import React, { useState } from "react";
import { HeaderOnBoarding } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase'; // Import your Firebase configuration

export default function NewUserScreen() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/about");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <HeaderOnBoarding />
            <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
                <div>
                    <h1><strong>Cadastre seu e-mail e senha no NossaLei</strong></h1>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Digite seu e-mail</label>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Digite sua senha com no mínimo 6 caracteres</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Confirme sua senha</label>
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                required
                            />
                        </div>
                        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <div>
                            <button type="submit" style={{ width: 100, height: 60, padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff' }}>Cadastrar e entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

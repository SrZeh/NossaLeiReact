import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderOnBoarding } from "../components/Header";
import { auth } from "../firebase"; // Ensure you export 'auth' from your firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
    const navigate = useNavigate();

    // State hooks for form inputs and feedback
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEntrarClick = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        setLoading(true);
        setError("");

        try {
            // Attempt to sign in with email and password
            await signInWithEmailAndPassword(auth, email, password);
            // On successful login, navigate to the desired route
            navigate("/about");
        } catch (err) {
            // Handle authentication errors
            switch (err.code) {
                case "auth/invalid-email":
                    setError("O endereço de e-mail é inválido.");
                    break;
                case "auth/user-disabled":
                    setError("Este usuário foi desativado.");
                    break;
                case "auth/user-not-found":
                    setError("Usuário não encontrado.");
                    break;
                case "auth/wrong-password":
                    setError("Senha incorreta.");
                    break;
                default:
                    setError("Ocorreu um erro ao fazer login. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <HeaderOnBoarding />
            <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
                <div>
                    <h1>Bem-vindo ao Nossa Lei</h1>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <form
                        onSubmit={handleEntrarClick}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginBottom: '5px' }}>Digite seu e-mail</label>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '300px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ marginBottom: '5px' }}>Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '300px',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                            <Link
                                to="/forgot-password"
                                style={{
                                    fontSize: '14px',
                                    color: '#007bff',
                                    textDecoration: 'none',
                                }}
                            >
                                Esqueci minha senha?
                            </Link>
                        </div>
                        {error && (
                            <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
                        )}
                        <div style={{ marginBottom: '20px' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: 150,
                                    height: 60,
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    fontSize: '20px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.6 : 1,
                                }}
                            >
                                {loading ? "Carregando..." : "Entrar"}
                            </button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <Link
                                to="/new-user"
                                style={{
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    backgroundColor: '#800080',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '20px',
                                }}
                            >
                                Registrar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

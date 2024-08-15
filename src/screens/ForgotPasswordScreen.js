import React, { useState } from "react";
import { HeaderOnBoarding } from "../components/Header";
import { auth } from "../firebase"; // Ensure you export 'auth' from your firebase.js
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            // Attempt to send a password reset email
            await sendPasswordResetEmail(auth, email);
            setMessage("Um link de recuperação de senha foi enviado para o seu e-mail.");
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    setError("O endereço de e-mail é inválido.");
                    break;
                case "auth/user-not-found":
                    setError("Usuário não encontrado.");
                    break;
                default:
                    setError("Ocorreu um erro ao tentar enviar o link de recuperação. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <HeaderOnBoarding />
            <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
                <div style={{ marginTop: '20px' }}>
                    <h1>Esqueceu sua senha?</h1>
                    <p>Insira seu e-mail abaixo para receber um link de recuperação de senha</p>
                    <form onSubmit={handlePasswordReset} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '10px' }}>
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
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
                        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    fontSize: '20px',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    border: 'none',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.6 : 1,
                                }}
                            >
                                {loading ? "Enviando..." : "Recuperar Senha"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

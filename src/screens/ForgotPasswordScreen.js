import React from "react";
import { HeaderOnBoarding } from "../components/Header";

export default function ForgotPasswordScreen() {
    return (<div>
        <HeaderOnBoarding />
        <div style={{ width: '80%', margin: '0 auto', padding: '0 10%', textAlign: 'center' }}>
            <div style={{ marginTop: '20px' }}>
                <h1>Esqueceu sua senha?</h1>
                <p>Insira seu e-mail abaixo para receber um link de recuperação de senha</p>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Digite seu e-mail" style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <button type="submit" style={{ fontSize: '20px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff' }}>Recuperar Senha</button>
                </div>
            </div>
        </div>
    </div>
    )
}

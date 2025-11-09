import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username) return setError("Digite seu nome de usuário");
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/getUserInfo", { username });
            if (!res.data) {
                setError("Usuário não encontrado");
                return;
            }
            navigate("/meusPedidos", { state: { user: res.data } });
        } catch {
            setError("Erro ao buscar usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginContainer">
            <Header />
            <div className="loginBody">
                <h2>Entrar</h2>
                <input
                    type="text"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Carregando..." : "Entrar"}
                </button>
                {error && <p className="errorText">{error}</p>}
            </div>
            <Footer />
        </div>
    );
}

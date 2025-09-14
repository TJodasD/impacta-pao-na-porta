import Header from "../../components/Header/Header";
import './signUp.css'
import Footer from "../../components/Footer/Footer";
import { useState } from 'react';
import api from "../../services/api";




export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false)
    const [userNameExists, setUserNameExists] = useState(false)
    const [userCreated, setUserCreated] = useState(false)

    const handleCepChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\D/g, '');

        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }

        if (value.length > 9) {
            value = value.slice(0, 9);
        }

        setCep(value);
    };


    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setWrongPassword(true);
            return
        }
        setWrongPassword(false);

        let newUser = {
            firstName: firstName,
            surname: lastName,
            username: email,
            zipCode: cep,
            address: address,
            password: password
        }
        console.log(newUser)
        let response = await api.post("/newUser", {
            newUser
        })
        if (response.data == "Esse usuário já existe") {
            setUserNameExists(true)
            return
        }
        setUserNameExists(false)
        setUserCreated(true)
        console.log(response)
    }
    return (
        <div className="signUpContainer">
            <Header />
            <div className="signUpBody">
                {userCreated ? (
                    <div className="successScreen">
                        <h2>Conta criada com sucesso!</h2>
                        <p>Você já pode fazer login.</p>
                        {/* <a href="/login">Ir para o login</a> */}
                    </div>
                ) : (
                    <div className="signUpCard">
                        <h2>Cadastro</h2>

                        <form className="signUpForm" onSubmit={handleSignUp}>
                            <label>Nome</label>
                            <input type="text" placeholder="Seu nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            <label>Sobrenome</label>
                            <input type="text" placeholder="Seu sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            <label>CEP</label>
                            <input type="text" placeholder="00000-000" value={cep} onChange={handleCepChange} maxLength={9} required />
                            <label>Endereço</label>
                            <input type="text" placeholder="R. Haddock Lobo, 499" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            <label>E-mail</label>
                            <input type="email" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label>Senha</label>
                            <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label>Confirmar senha</label>
                            <input type="password" placeholder="******" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            {wrongPassword ? <p className="wrongPasswordText">As senhas precisam ser iguais</p> : <></>}
                            {userNameExists ? <p className="wrongPasswordText">Esse usuário já existe</p> : <></>}
                            <button type="submit">Criar Conta</button>

                            {/* <p className="login-link">Já tem conta? <a href="/login">Entrar</a></p> */}
                        </form>
                    </div>)}
            </div>

            <Footer />
        </div>
    );
}
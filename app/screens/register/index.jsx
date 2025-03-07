import React, { useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import AuthLinks from "../../components/AuthLinks";

import { server, showError, showSuccess } from "../../common";
import axios from "axios";


export default function Register() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        if (!nome || nome.trim() === "") {
            showError("O nome é obrigatório.");
            return;
        }
        if (!email || email.trim() === "") {
            showError("O email é obrigatório.");
            return;
        }
        if (!password || password.trim() === "") {
            showError("A senha é obrigatória.");
            return;
        }
        if (nome.length < 3 || nome.length > 100) {
            showError("O nome deve ter entre 3 e 100 caracteres.");
            return;
        }
        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            showError("Email inválido.");
            return;
        }
        if (password.length < 6 || password.length > 50) {
            showError("A senha deve ter entre 6 e 50 caracteres.");
            return;
        }

        try {
            const res = await axios.post(`${server}/users`, {
                nome: nome,
                email: normalizedEmail,
                password: password,
            });
            showSuccess("Usuário cadastrado com sucesso!");
            console.log(res.data);
            router.replace("/screens/login");

        } catch (e) {
            showError(e);
        }

    }

    return (
        <>
            <AppBar />
            <AuthLinks />
            <ScrollView>
                <FormContainer
                    titulo={"Bem-vindo ao delta escola"}
                    inputs={[
                        {
                            icon: "user-circle",
                            placeholder: "Insira seu nome",
                            onChangeText: setNome,
                        },
                        {
                            icon: "envelope",
                            placeholder: "Insira seu email",
                            onChangeText: setEmail,
                        },
                        {
                            icon: "lock",
                            placeholder: "Insira sua senha",
                            secure: true,
                            onChangeText: setPassword,
                        },
                    ]}
                    textButton={"Criar Conta"}
                    func={register}
                />
            </ScrollView>
        </>
    );

}
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import AuthLinks from "../../components/AuthLinks";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server, showError, showSuccess } from "../../common";

export default function Login() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = async () => {
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
            const res = await axios.post(`${server}/tokens/`, {
                email: normalizedEmail,
                password: password,
            });

            await AsyncStorage.setItem("userData", JSON.stringify(res.data));
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            router.replace({
                pathname: "/screens/home",
                params: res.data,
            });
            showSuccess("Entrou com sucesso!");
        } catch (e) {
            console.error(e);
            showError("Erro ao fazer login.");
        }
    };

    return (
        <>
            <AppBar />
            <AuthLinks />
            <ScrollView>
                <FormContainer
                    titulo={"Bem-vindo ao Delta Escola"}
                    inputs={[
                        {
                            icon: "envelope",
                            placeholder: "Insira seu email",
                            onChangeText: setEmail,
                        },
                        {
                            icon: "lock",
                            placeholder: "Insira sua senha",
                            onChangeText: setPassword,
                            secure: true,
                        },
                    ]}
                    textButton={"Entrar"}
                    func={login}
                />
            </ScrollView>
        </>
    );
}
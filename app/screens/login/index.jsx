import React from "react";
import { ScrollView,Alert } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import AuthLinks from "../../components/AuthLinks";
import axios from "axios";
import {server, showError, showSuccess} from "../../common";


export default function Login() {

    const login = async () => {
        try {
            const res = await axios.get(`${server}/alunos`);
            console.log(res.data); 
        } catch (e) {
            console.error(e); 
        }
    };

    const retorne = () => {
        console.log("TESTANDOOO");
    }

    return (
        <>
            <AppBar />
            <AuthLinks />
            <ScrollView>
                <FormContainer
                    titulo={"Bem-vindo ao delta escola"}
                    inputs={[
                        { icon: "envelope", placeholder: "Insira seu email" },
                        { icon: "lock", placeholder: "Insira sua senha" },
                    ]}
                    textButton={"Entrar"} 
                    func={login}
                />
            </ScrollView>
        </>
    )

}
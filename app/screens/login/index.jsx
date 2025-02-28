import React from "react";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import AuthLinks from "../../components/AuthLinks";


export default function Login() {

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
                />
            </ScrollView>
        </>
    )

}
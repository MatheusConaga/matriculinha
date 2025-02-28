import React from "react";
import { ScrollView, View } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import AuthLinks from "../../components/AuthLinks";

export default function Register() {

    return (
        <>
            <AppBar />
            <AuthLinks />
            <ScrollView>
                <FormContainer
                    titulo={"Bem-vindo ao delta escola"}
                    inputs={[
                        { icon: "user-circle", placeholder: "Insira seu nome" },
                        { icon: "envelope", placeholder: "Insira seu email" },
                        { icon: "lock", placeholder: "Insira sua senha" },
                    ]}
                    textButton={"Criar Conta"}
                />
            </ScrollView>
        </>
    );

}
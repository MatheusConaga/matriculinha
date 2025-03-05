import React from "react";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";

export default function CadastroAlunos() {

    return (
        <>
            <AppBar />
            <ScrollView>
                <FormContainer
                    showLogo={false}
                    titulo={"Cadastrar aluno"}
                    inputs={[
                        { icon: "user-circle", placeholder: "Insira o nome" },
                        { icon: "user-circle", placeholder: "Insira o sobrenome" },
                        { icon: "envelope", placeholder: "Insira o email" },
                        { icon: "user-circle", placeholder: "Insira a idade" },
                        { icon: "user-circle", placeholder: "Insira a altura" },
                        { icon: "user-circle", placeholder: "Insira o peso" },
                    ]}
                    textButton={"Cadastrar aluno"}
                />
            </ScrollView>
        </>
    );

}
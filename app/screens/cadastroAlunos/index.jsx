import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { server, showError, showSuccess } from "../../common";

export default function CadastroAlunos() {
    const params = useLocalSearchParams();

    const [foto, setFoto] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");

    useEffect(() => {
        if (params.id) {
            axios
                .get(`${server}/alunos/${params.id}`)
                .then((response) => {
                    const aluno = response.data;
                    setNome(aluno.nome || "");
                    setSobrenome(aluno.sobrenome || "");
                    setEmail(aluno.email || "");
                    setIdade(aluno.idade.toString() || "");
                    setAltura(aluno.altura.toString() || "");
                    setPeso(aluno.peso.toString() || "");
                    setFoto(aluno.Photos?.length > 0 ? aluno.Photos[0].url : "");
                })
                .catch((error) => {
                    showError("Erro ao carregar detalhes do aluno.");
                });
        }
    }, [params.id]);


    return (
        <>
            <AppBar />
            <ScrollView>
                <FormContainer
                    showLogo={false}
                    titulo={params.id ? "Editar Aluno" : "Cadastrar aluno"}
                    inputs={[
                        { icon: "user-circle", placeholder: "Insira o nome", value: nome, onChangeText: setNome },
                        { icon: "user-circle", placeholder: "Insira o sobrenome", value: sobrenome, onChangeText: setSobrenome },
                        { icon: "envelope", placeholder: "Insira o email", value: email, onChangeText: setEmail },
                        { icon: "user-circle", placeholder: "Insira a idade", value: idade, onChangeText: setIdade, keyboardType: "numeric" },
                        { icon: "user-circle", placeholder: "Insira a altura", value: altura, onChangeText: setAltura, keyboardType: "numeric" },
                        { icon: "user-circle", placeholder: "Insira o peso", value: peso, onChangeText: setPeso, keyboardType: "numeric" },
                    ]}
                    textButton={"Cadastrar aluno"}
                    foto={foto}
                />
            </ScrollView>
        </>
    );
}

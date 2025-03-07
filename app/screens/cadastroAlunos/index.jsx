import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server, showError, showSuccess } from "../../common";
import FotoAluno from "../../components/FotoAluno";

export default function CadastroAlunos() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [foto, setFoto] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [idade, setIdade] = useState("");
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");

    useEffect(() => {
        async function checkLogin() {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                router.replace("/screens/login");
            } else {
                const parsed = JSON.parse(userData);
                setToken(parsed.token);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        if (params.id) {
            axios
                .get(`${server}/alunos/${params.id}`)
                .then((response) => {
                    const aluno = response.data;
                    console.log("Dados do aluno:", aluno);

                    setNome(aluno.nome || "");
                    setSobrenome(aluno.sobrenome || "");
                    setEmail(aluno.email || "");
                    setIdade(aluno.idade ? aluno.idade.toString() : "");
                    setAltura(aluno.altura ? aluno.altura.toString() : "");
                    setPeso(aluno.peso ? aluno.peso.toString() : "");

                    const fotoUrl = aluno.Photos?.length > 0 ? aluno.Photos[0].url : "";
                    console.log("URL da foto carregada:", fotoUrl);
                    setFoto(fotoUrl);
                })
                .catch((error) => {
                    showError("Erro ao carregar detalhes do aluno.");
                    console.error("Erro no GET do aluno:", error);
                });
        }
    }, [params.id]);

    const editaOrCadastro = async () => {
        try {
            const config = { headers: { "Authorization": `Bearer ${token}` } };
            const alunoData = {
                nome: nome.trim(),
                sobrenome: sobrenome.trim(),
                email: email.trim(),
                idade: Number(idade.trim()),
                altura: Number(altura.trim()),
                peso: Number(peso.trim()),
            };
            let alunoId = params.id;

            let res;
            if (alunoId) {
                res = await axios.put(`${server}/alunos/${alunoId}`, alunoData, config);
                console.log("Aluno atualizado:", res.data);
            } else {
                res = await axios.post(`${server}/alunos`, alunoData, config);
                alunoId = res.data.id;
                console.log("Aluno cadastrado:", res.data);
            }

            showSuccess(alunoId ? "Aluno atualizado com sucesso!" : "Aluno cadastrado com sucesso!");
            router.back();
        } catch (error) {
            console.error("Erro ao salvar aluno:", error.response?.data || error.message);
            showError("Erro ao salvar aluno.");
        }
    };

    const changeFoto = (newUri) => {
        setFoto(newUri);
        console.log("A NOVA FOTO É: ", newUri);
    };

    return (
        <>
            <AppBar />
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView>
                    <FormContainer
                        showLogo={false}
                        foto={foto}
                        titulo={params.id ? "Editar Aluno" : "Cadastrar aluno"}
                        inputs={[
                            { icon: "user-circle", placeholder: "Nome", value: nome, onChangeText: setNome },
                            { icon: "user-circle", placeholder: "Sobrenome", value: sobrenome, onChangeText: setSobrenome },
                            { icon: "envelope", placeholder: "Email", value: email, onChangeText: setEmail },
                            { icon: "calendar", placeholder: "Idade", value: idade, onChangeText: setIdade, keyboardType: "numeric" },
                            { icon: "ruler", placeholder: "Altura", value: altura, onChangeText: setAltura, keyboardType: "numeric" },
                            { icon: "weight", placeholder: "Peso", value: peso, onChangeText: setPeso, keyboardType: "numeric" },
                        ]}
                        textButton={params.id ? "Editar Aluno" : "Cadastrar aluno"}
                        func={editaOrCadastro}
                        fotoComponent={
                            <FotoAluno
                                foto={foto}
                                button={true}
                                onChangeFoto={changeFoto}
                                alunoId={params.id}
                                token={token}
                            />
                        }
                    />
                </ScrollView>
            )}
        </>
    );
}

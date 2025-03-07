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

    useEffect(() => {
        async function checkLogin() {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                router.replace("/screens/login");
            } else {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        if (params.id) {
            axios
                .get(`${server}/alunos/${params.id}`)
                .then(response => {
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
                .catch(error => {
                    showError("Erro ao carregar detalhes do aluno.");
                    console.error("Erro no GET do aluno:", error);
                });
        }
    }, [params.id]);

    const handleUploadImage = async (alunoId, token) => {
        if (!foto || !foto.startsWith("file")) return;

        try {
            const filename = foto.split("/").pop();
            const fileType = filename.split('.').pop().toLowerCase();

            const formData = new FormData();
            formData.append("photo", {
                uri: foto,
                name: filename,
                type: `image/${fileType}`,
            });
            formData.append("aluno_id", alunoId.toString());

            const photoConfig = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            };

            console.log("Enviando foto com FormData:", formData);
            const resPhoto = await axios.post(`${server}/photos/`, formData, photoConfig);
            console.log("Foto enviada com sucesso:", resPhoto.data);

            const updatedAluno = await axios.get(`${server}/alunos/${alunoId}`);
            const novaFotoUrl = updatedAluno.data.Photos?.length > 0 ? updatedAluno.data.Photos[0].url : "";
            setFoto(novaFotoUrl);
        } catch (err) {
            console.error("Erro ao enviar a foto:", err.response?.data || err.message);
            showError("Erro ao enviar a foto.");
        }
    };

    const editaOrCadastro = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            const token = userData ? JSON.parse(userData).token : "";
            console.log("URI da foto a ser enviada:", foto);

            const config = { headers: { "Authorization": `Bearer ${token}` } };
            const alunoData = {
                nome: nome.trim(),
                sobrenome: sobrenome.trim(),
                email: email.trim(),
                idade: Number(idade.trim()),
                altura: Number(altura.trim()),
                peso: Number(peso.trim())
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

            // Envia a foto somente se for uma imagem local
            await handleUploadImage(alunoId, token);

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
                            />
                        }
                    />
                </ScrollView>
            )}
        </>
    );
}

import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { style } from "./style";
import { server, showError, showSuccess } from "../../common";

export default function FotoAluno({ foto, button = false, onChangeFoto, alunoId, token }) {
    const [localImage, setLocalImage] = useState(foto);

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

    const editarFoto = async () => {
        console.log("Solicitando permissão para acessar a galeria...");
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Precisamos do acesso da sua galeria!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("Resultado do ImagePicker:", result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            const uri = selectedAsset.uri;
            const filename = uri.substring(uri.lastIndexOf("/") + 1);
            const extend = filename.split(".").pop();
            console.log("Imagem selecionada:", { uri, filename, extend });

            setLocalImage(uri);
            if (onChangeFoto) {
                onChangeFoto(uri);
            }

            if (!alunoId) {
                console.log("AlunoId não fornecido. Upload não será realizado.");
                return;
            }

            console.log("AlunoId detectado. Iniciando upload...");

            try {
                const formData = new FormData();
                const photoObj = {
                    name: filename,
                    uri: uri,
                    type: `image/${extend}`,
                };
                formData.append("photo", JSON.parse(JSON.stringify(photoObj)));
                formData.append("aluno_id", alunoId);

                console.log("FormData criado:", {
                    photo: photoObj,
                    aluno_id: alunoId,
                });

                const headers = { "Content-Type": "multipart/form-data" };
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                console.log("Enviando foto com FormData...");
                const resPhoto = await axios.post(`${server}/photos/`, formData, { headers });
                console.log("Resposta do upload:", resPhoto.data);

                if (resPhoto.data && resPhoto.data.url) {
                    console.log("URL retornada:", resPhoto.data.url);
                    setLocalImage(resPhoto.data.url);
                    if (onChangeFoto) {
                        onChangeFoto(resPhoto.data.url);
                    }
                    showSuccess("Foto atualizada com sucesso!");
                } else {
                    console.log("Upload sem URL na resposta. Buscando atualização via GET...");
                    const updatedAluno = await axios.get(`${server}/alunos/${alunoId}`);
                    const novaFotoUrl =
                        updatedAluno.data.Photos?.length > 0 ? updatedAluno.data.Photos[0].url : "";
                    console.log("URL obtida após GET:", novaFotoUrl);
                    setLocalImage(novaFotoUrl);
                    if (onChangeFoto) {
                        onChangeFoto(novaFotoUrl);
                    }
                    showSuccess("Foto atualizada com sucesso!");
                }
            } catch (err) {
                console.error("Erro ao enviar a foto:", err.response?.data || err.message);
                showError("Erro ao enviar a foto.");
            }
        } else {
            console.log("Nenhuma imagem selecionada ou operação cancelada.");
        }
    };

    return (
        <View style={style.container}>
            {localImage ? (
                <Image source={{ uri: localImage }} style={style.foto} />
            ) : foto ? (
                <Image source={{ uri: foto }} style={style.foto} />
            ) : (
                <FontAwesome name="user-circle" size={90} color="black" />
            )}
            {button && (
                <TouchableOpacity style={style.editButton} onPress={editarFoto}>
                    <FontAwesome name="edit" size={20} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
}
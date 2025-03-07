import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server, showError, showSuccess } from "../../common";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";

export default function AlunoItem({ id, foto, nome, email, atualizarLista }) {
    const router = useRouter();

    const deleteAluno = async () => {
        const userData = await AsyncStorage.getItem("userData");

        if (!userData) {
            router.replace("screens/login");
            return;
        }

        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir este aluno?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            console.log(`Tentando excluir aluno com ID: ${id}`);

                            const user = JSON.parse(userData);
                            const token = user.token;

                            const res = await axios.delete(`${server}/alunos/${id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });

                            console.log("Resposta da API:", res.data);
                            showSuccess("Usuário excluído com sucesso!");
                            atualizarLista();
                        } catch (e) {
                            console.error("Erro ao excluir aluno:", e);
                            showError(e);
                        }
                    },
                    style: "destructive",
                }
            ]
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={() => (
                <TouchableOpacity style={style.deleteButton} onPress={deleteAluno}>
                    <Icon name="trash" size={30} color="#fff" />
                </TouchableOpacity>
            )}>
                <TouchableOpacity onLongPress={() => router.push({ pathname: "/screens/cadastroAlunos", params: { id } })}>
                    <View style={style.container}>
                        <View>
                            {foto ? (
                                <Image source={{ uri: foto }} style={style.foto} />
                            ) : (
                                <FontAwesome name="user-circle" size={60} color="black" />
                            )}
                        </View>
                        <View>
                            <Text>{nome}</Text>
                        </View>
                        <View>
                            <Text>{email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>
    );
}
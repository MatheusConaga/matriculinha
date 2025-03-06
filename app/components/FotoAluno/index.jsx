import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";
import axios from "axios";
import { server, showError, showSuccess } from "../../common";


export default function FotoAluno({ foto, button = false }) {

    const [alunos, setAlunos] = useState([]);

    const carregarAlunos = async () => {
        try {
            const res = await axios.get(`${server}/alunos`);
            setAlunos(res.data);
        } catch (error) {
            showError("Erro ao carregar alunos.");
        }
    };

    useEffect(() => {
        carregarAlunos();
    }, []);


    return (

        <View style={style.container}>
            {foto ? (
                <Image source={{ uri: foto }} style={style.foto} />
            ) : (
                <FontAwesome name="user-circle" size={90} color="black" />
            )}
            {button ? (
                <TouchableOpacity style={style.editButton} onPress={() => alert("Editando...")}>
                    <FontAwesome name="edit" size={20} color="white" />
                </TouchableOpacity>
            ) : null
            }
        </View>
    );


}
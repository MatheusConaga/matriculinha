import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";

export default function FotoAluno({ foto, button = false, onChangeFoto }) {
    const [localImage, setLocalImage] = useState(null);

    const editarFoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Precisamos do acesso da sua galeria!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("Resultado do ImagePicker:", result);

        if (!result.canceled) {
            const newUri = result.assets[0].uri;
            console.log("URI selecionada no FotoAluno:", newUri);
            setLocalImage(newUri);
            if (onChangeFoto) {
                console.log("Chamando onChangeFoto com:", newUri);
                onChangeFoto(newUri); // Repassa a URI para o componente pai
            } else {
                console.log("onChangeFoto não está definido!");
            }
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

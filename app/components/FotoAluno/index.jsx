import React from "react";
import { View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";


export default function FotoAluno() {

    return (

        <View style={style.container}>
            <FontAwesome name="user-circle" size={100} color="black" />
            <TouchableOpacity style={style.editButton}>
                <FontAwesome name="edit" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );


}
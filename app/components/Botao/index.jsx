import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { style } from "./style";

export default function Botao({ text, func }) {

    return (
        <TouchableOpacity style={style.button} onPress={func}>
            <Text style={style.button_text}>{text}</Text>
        </TouchableOpacity>
    )

}
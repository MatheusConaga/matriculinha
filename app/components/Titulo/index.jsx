import { Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { Colors } from "../../../constants/Colors";

export default function Titulo({ titulo, func, selected = true }) {
    const content = (
        <Text style={[style.titulo, { color: selected ? Colors.theme.title : Colors.theme.not_button }]}>
            {titulo}
        </Text>
    );

    return func ? (
        <TouchableOpacity onPress={func}>
            {content}
        </TouchableOpacity>
    ) : (
        content
    );
}

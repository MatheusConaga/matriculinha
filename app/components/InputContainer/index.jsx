import { View, TextInput } from "react-native";
import { style } from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from "../../../constants/Colors";


export default function InputContainer({placeholder, icon}) {

    return (
        <View style={style.inputContainer}>
            <Icon name={icon} size={20} color={Colors.theme.icon} style={style.icon} />
            <TextInput placeholder={placeholder} style={style.input}></TextInput>
        </View>
    )

}
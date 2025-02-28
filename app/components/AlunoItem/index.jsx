import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";

export default function AlunoItem (){
    return (

        <View style={style.container}>
            <FontAwesome name="user-circle" size={50} color="black" />
            <Text>NOME ALUNO</Text>
            <Text>EMAIL@GMAIL.COM</Text>
        </View>

    );
}


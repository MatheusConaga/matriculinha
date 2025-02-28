import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";

export default function AlunoItem() {
    const router = useRouter();

    const getRightContent = () => {
        return (
            <TouchableOpacity style={style.deleteButton} onPress={() => alert("Deletando....")}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={getRightContent}
            >
                <TouchableOpacity onLongPress={() => router.push("/screens/cadastroAlunos")}>
                    <View style={style.container}>
                        <FontAwesome name="user-circle" size={50} color="black" />
                        <Text>NOME ALUNO</Text>
                        <Text>EMAIL@GMAIL.COM</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>

    );
}


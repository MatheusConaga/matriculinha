import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { style } from "./style";

export default function AlunoItem({ nome, email }) {
    const router = useRouter();

    const getRightContent = () => {
        return (
            <TouchableOpacity style={style.deleteButton} onPress={() => alert("Deletando....")}>
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }

    const editarAluno = () => {

        router.push({
            pathname: "/screens/cadastroAlunos",
            params: {nome, email}
        })
    }

    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={getRightContent}
            >

                <TouchableOpacity onLongPress={editarAluno}>
                    <View style={style.container}>
                        <FontAwesome name="user-circle" size={50} color="black" />
                        <Text>{nome}</Text>
                        <Text>{email}</Text>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>

    );
}


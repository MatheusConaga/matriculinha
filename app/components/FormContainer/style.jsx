import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

export const style = StyleSheet.create({

    container:{
        backgroundColor: Colors.theme.container,
        alignSelf: 'center',
        width: "90%",
        borderRadius: 10,
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
})
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

export const style = StyleSheet.create({

    container: {
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "space-around",
    },
    editButton: {
        backgroundColor: Colors.theme.button,
        padding: 10,
        borderRadius: 10,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    foto: {
        width: 90,
        height: 90,
        borderRadius: 50,
    },


})
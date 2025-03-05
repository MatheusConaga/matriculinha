import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

export const style = StyleSheet.create({
    deleteButton: {
        backgroundColor: Colors.theme.title,
        alignItems: "center",
        padding: 30,
        borderRadius: 10,
        marginRight: 10,
        height: 100,
        alignSelf: "flex-end",
    },

    container: {
        backgroundColor: Colors.theme.container,
        width: "90%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 10,
        marginTop: 15,
        paddingLeft: 5,
        paddingRight: 5,
        alignSelf: "center",

    },
    foto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

});
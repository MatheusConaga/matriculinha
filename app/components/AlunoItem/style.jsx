import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";

export const style = StyleSheet.create({

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

    }

});
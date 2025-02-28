import { StyleSheet } from "react-native"
import { Colors } from "../../../constants/Colors"


export const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: Colors.theme.button,
        padding: 10,
        flexDirection: 'column',
        borderRadius: 10,
        width: '80%',
    },
    button_text: {
        color: Colors.theme.button_text,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
})
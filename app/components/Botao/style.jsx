import { StyleSheet } from "react-native"
import { Colors } from "../../../constants/Colors"


export const style = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: Colors.theme.button,
        padding: 10,
        flexDirection: 'column',
        borderRadius: 5,
        width: '70%',
        marginTop: 20,
        marginBottom: 20,
    },
    button_text: {
        color: Colors.theme.button_text,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
})
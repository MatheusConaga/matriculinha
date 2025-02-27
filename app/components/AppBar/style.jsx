import { StyleSheet } from "react-native"
import { Colors } from "../../../constants/Colors"

export const style = StyleSheet.create({

    appBar: {
        backgroundColor: Colors.theme.app_bar,
        height: 70,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 20,
        marginBottom:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 60,
    },
})
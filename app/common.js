import { Alert } from "react-native";
import Toast from 'react-native-toast-message';


const server = "http://10.0.0.163:80";

function showError(err) {
    if (err.response && err.response.data) {
        Alert.alert("Ocorreu um erro inesperado!", `Mensagem: ${err.response.data}`);
    } else {
        Alert.alert("Ocorreu um erro inesperado!", `Mensagem: ${err.message}`);
    }
}

function showSuccess(msg) {
    Alert.alert("Sucesso!", msg);
}

export { server, showError, showSuccess };
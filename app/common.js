import { Alert } from "react-native";
import Toast from 'react-native-toast-message';


const server = "http://192.168.15.4:80";

function showError(err) {
    console.error("Erro detectado:", err); // Exibir erro no console

    let mensagem = "Erro desconhecido";
    if (err.response) {
        mensagem = err.response.data?.message || JSON.stringify(err.response.data);
    } else if (err.message) {
        mensagem = err.message;
    }

    Alert.alert("Ocorreu um erro inesperado!", `Mensagem: ${mensagem}`);
}


function showSuccess(msg) {
    Alert.alert("Sucesso!", msg);
}

export { server, showError, showSuccess };
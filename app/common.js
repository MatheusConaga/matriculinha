import { Alert } from "react-native";

const server = "http://10.0.0.163:80";

function showError(err) {
    if (err.response && err.response.data) {
        console.log("Ocorreu um erro inesperado!", `Mensagem: ${err.response.data}`);
    } else {
        console.log("Ocorreu um erro inesperado!", `Mensagem: ${err.message}`);
    }
}

function showSuccess(msg) {
    console.log("Sucesso!", msg);
}

export { server, showError, showSuccess };
import { View, TextInput, Image } from "react-native";
import { style } from "./style";
import logo from "../../../assets/imgs/logo_delta.png";
import InputContainer from "../InputContainer";
import Botao from "../Botao";


export default function FormContainer() {

    return (
        <View style={style.container}>
            <Image source={logo} style={style.logo} resizeMode="cover" />
            <InputContainer icon={"envelope"} placeholder={"Insira seu email"}/>
            <InputContainer icon={"lock"} placeholder={"Insira sua senha"}/>
            <Botao text={"Entrar"}/>
        </View>
    )

}
import { View, Image } from "react-native";
import { style } from "./style";
import logo from "../../../assets/imgs/logo_delta.png";
import InputContainer from "../InputContainer";
import Botao from "../Botao";
import Titulo from "../Titulo";
import FotoAluno from "../FotoAluno";

export default function FormContainer({ titulo, textButton, inputs = [], func, showLogo = true, foto }) {
    return (
        <View style={style.container}>
            {showLogo && <Image source={logo} style={style.logo} resizeMode="cover" />}
            <Titulo titulo={titulo} />
            {showLogo == false && <FotoAluno button={true} foto={foto} />}
            {inputs.map((input, index) => (
                <InputContainer
                    key={index}
                    icon={input.icon}
                    value={input.value}
                    placeholder={input.placeholder}
                    onChangeText={input.onChangeText}
                    secure={input.secure}
                    keyboardType={input.keyboardType}
                />
            ))}
            <Botao text={textButton} func={func} />
        </View>
    );
}

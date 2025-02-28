import { View } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Titulo from "../Titulo";
import { style } from "./style";


export default function AuthLinks() {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogin = () => {
        router.push("/screens/login");
    }
    const handleRegister = () => {
        router.push("/screens/register");
    }

    const isLogin = pathname === "/screens/login";
    const isRegister = pathname === "/screens/register";


    return (
        <View style={style.container}>
            <Titulo titulo={"Login"} func={handleLogin} selected={isLogin} />
            <View style={{ width: 5, height: 30, backgroundColor: '#ccc', marginHorizontal: 10 }} />
            <Titulo titulo={"Cadastro"} func={handleRegister} selected={isRegister} />
        </View>
    )


}
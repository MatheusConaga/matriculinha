import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import logo from "../../../assets/imgs/logo_delta.png";
import { style } from "./style";

export default function AppBar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userData = await AsyncStorage.getItem("userData");
            setIsLoggedIn(!!userData);
        };
        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    onPress: async () => {
                        await AsyncStorage.removeItem("userData");
                        setIsLoggedIn(false);
                        router.replace("/screens/login");
                    },
                },
            ]
        );
    };

    return (
        <View style={style.appBar}>
            <TouchableOpacity onPress={() => router.replace("/screens/home")}>
                <Image source={logo} style={style.logo} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity onPress={isLoggedIn ? handleLogout : () => router.replace("/screens/login")}>
                <FontAwesome name={isLoggedIn ? "sign-out" : "user-circle"} size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
}

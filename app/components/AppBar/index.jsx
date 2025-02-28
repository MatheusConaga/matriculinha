import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import logo from "../../../assets/imgs/logo_delta.png";
import { style } from "./style";

export default function AppBar() {

    const router = useRouter();

    return (
        <View style={style.appBar}>
            <TouchableOpacity onPress={() => router.replace("/screens/home")}>
                <Image source={logo} style={style.logo} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/screens/login")}>
                <FontAwesome name="user-circle" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );

}

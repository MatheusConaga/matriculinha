import { View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import logo from "../../../assets/imgs/logo_delta.png";
import { style } from "./style";

export default function AppBar() {

    return (
        <View style={style.appBar}>
            <TouchableOpacity>
                <Image source={logo} style={style.logo} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="user-circle" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );

}

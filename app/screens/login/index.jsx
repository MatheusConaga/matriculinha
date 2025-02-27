import React from "react";
import { ScrollView, Text } from "react-native";
import AppBar from "../../components/AppBar";
import FormContainer from "../../components/FormContainer";

export default function Login (){

    return (
        <>
        <AppBar/>
        <ScrollView>
            <FormContainer/>
        </ScrollView>
        </>
    )

}
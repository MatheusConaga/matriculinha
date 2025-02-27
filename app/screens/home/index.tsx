import React from "react";
import { Text, ScrollView } from "react-native";

import AppBar from "../../components/AppBar";
import AlunoItem from "../../components/AlunoItem";
import Botao from "../../components/Botao";

import { style } from "./style";

export default function Home() {

    return (
        <>
        <AppBar />
            <ScrollView>
                <Botao text="Adicionar aluno" func={() => alert("Adicionando aluno...")} />
                <AlunoItem />
                <AlunoItem />
                <AlunoItem />
                <AlunoItem />
                <AlunoItem />
                <AlunoItem />
                <AlunoItem />
            </ScrollView>
        </>
    );

}

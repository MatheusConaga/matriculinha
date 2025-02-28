import React from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

import AppBar from "../../components/AppBar";
import AlunoItem from "../../components/AlunoItem";
import Botao from "../../components/Botao";

import { style } from "./style";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <AppBar />
            <ScrollView>
                <Botao text="Adicionar aluno" func={() => router.push("/screens/cadastroAlunos")} />
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

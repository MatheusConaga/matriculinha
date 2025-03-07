import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AppBar from "../../components/AppBar";
import AlunoItem from "../../components/AlunoItem";
import Botao from "../../components/Botao";
import axios from "axios";
import { server, showError } from "../../common";
import { style } from "./style";

export default function Home() {
    const router = useRouter();
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        carregarAlunos();
    }, []);

    const carregarAlunos = async () => {
        try {
            const res = await axios.get(`${server}/alunos`);
            setAlunos(res.data);
        } catch (error) {
            showError("Erro ao carregar alunos.");
        }
    };

    return (
        <>
            <AppBar />
            <ScrollView>
                <Botao text="Adicionar aluno" func={() => router.push("/screens/cadastroAlunos")} />
                {alunos.map((aluno) => (
                    <AlunoItem
                        key={aluno.id}
                        id={aluno.id}
                        foto={aluno.Photos?.[0]?.url ?? null}
                        nome={aluno.nome}
                        email={aluno.email}
                        atualizarLista={carregarAlunos} // Passando a função para atualizar lista
                    />
                ))}
            </ScrollView>
        </>
    );
}

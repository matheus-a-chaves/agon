import React, { useCallback, useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import Bracket from '../../components/Bracket';
import Orientation from 'react-native-orientation-locker';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { CampeonatoService } from '../../services/campeonato.service';

export interface Chaveamento {
    id: string;
    name: string;
    logo: string;
}

const oitavasDefault: Chaveamento[] = [
    { id: '1', name: '', logo: '' },
    { id: '2', name: '', logo: '' },
    { id: '3', name: '', logo: '' },
    { id: '4', name: '', logo: '' },
    { id: '5', name: '', logo: '' },
    { id: '6', name: '', logo: '' },
    { id: '7', name: '', logo: '' },
    { id: '8', name: '', logo: '' },
];

const quartasDefault: Chaveamento[] = [
    { id: '1', name: '', logo: '' },
    { id: '2', name: '', logo: '' },
    { id: '3', name: '', logo: '' },
    { id: '4', name: '', logo: '' },
];

const semiDefault = [
    { id: '1', name: '', logo: '' },
    { id: '2', name: '', logo: '' },
];

const finalDefault = [
    { id: '1', name: '', logo: '' },
];

const ChaveamentoScreen: React.FC = () => {
    const [chaveamento, setChaveamento] = useState<any>([]);
    const [oitavasEsquerda, setOitavasEsquerda] = useState<Chaveamento[]>(oitavasDefault);
    const [oitavasDireita, setOitavasDireita] = useState<Chaveamento[]>(oitavasDefault);
    const [quartasEsquerda, setQuartasEsquerda] = useState<Chaveamento[]>(quartasDefault);
    const [quartasDireita, setQuartasDireita] = useState<Chaveamento[]>(quartasDefault);
    const [semiEsquerda, setSemiEsquerda] = useState<Chaveamento[]>(semiDefault);
    const [semiDireita, setSemiDireita] = useState<Chaveamento[]>(semiDefault);
    const [finalEsquerda, setFinalEsquerda] = useState<Chaveamento[]>(finalDefault);
    const [finalDireita, setFinalDireita] = useState<Chaveamento[]>(finalDefault);
    const [champion, setChampion] = useState<Chaveamento[]>(finalDefault);
    const route = useRoute();
    const { idCampeonato }: any = route.params;
    const [isAparence, setIsAparence] = useState(0);

    useEffect(() => {
        Orientation.lockToLandscape();
        const fetchData = async () => {
            await fetchChaveamento();
        };
        fetchData();
    }, []);

    async function fetchChaveamento() {
        try {
            const data = await CampeonatoService.buscarChaveamento(idCampeonato);
            if (data) {
                verificaMontagem(data);
            } else {
                console.error("Data is undefined");
            }
        } catch (error) {
            console.error("Failed to fetch chaveamento:", error);
        }
    }

    function verificaMontagem(data: any) {
        const dataItem = data["1"];
        console.log(data);
        if (dataItem && dataItem.length === 8) {
            setIsAparence(8);
            montaOitavas(data["1"]);
        } else if (dataItem && dataItem.length === 4) {
            setIsAparence(4);
            montaQuartas(data["1"]);
        } else if (dataItem && dataItem.length === 2) {
            setIsAparence(2);
            montaSemi(data["1"]);
        }
    }

    function montaOitavas(chaveamento: any) {
        if (chaveamento) {
            const oitavasEsquerdaData = chaveamento.slice(0, 4).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                },
            ]).flat();

            const oitavasDireitaData = chaveamento.slice(4, 8).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                },
            ]).flat();

            setOitavasEsquerda(oitavasEsquerdaData);
            setOitavasDireita(oitavasDireitaData);
        }
    }

    function montaQuartas(chaveamento: any) {
        if (chaveamento) {
            const quartasEsquerdaData = chaveamento.slice(0, 2).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                }
            ]).flat();
            const quartasDireitaData = chaveamento.slice(2, 4).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                }
            ]).flat();

            setQuartasEsquerda(quartasEsquerdaData);
            setQuartasDireita(quartasDireitaData);
        }
    }

    function montaSemi(chaveamento: any) {
        if (chaveamento) {
            const semiEsquerdaData = chaveamento.slice(0, 1).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                }
            ]).flat();
            const semiDireitaData = chaveamento.slice(1, 2).map((match: any) => [
                {
                    id: match.equipeUm.id,
                    name: match.equipeUm.nome,
                    logo: match.equipeUm.imagem,
                },
                {
                    id: match.equipeDois.id,
                    name: match.equipeDois.nome,
                    logo: match.equipeDois.imagem,
                }
            ]).flat();

            setSemiEsquerda(semiEsquerdaData);
            setSemiDireita(semiDireitaData);
        }
    }

    return (
        <NativeBaseProvider>
            <Bracket
                oitavasDireita={oitavasDireita}
                oitavasEsquerda={oitavasEsquerda}
                quartasEsquerda={quartasEsquerda}
                quartasDireita={quartasDireita}
                semiDireita={semiDireita}
                semiEsquerda={semiEsquerda}
                finalDireita={finalDireita}
                finalEsquerda={finalEsquerda}
                champion={champion}
                isAparence={isAparence}
            />
        </NativeBaseProvider>
    );
};

export default ChaveamentoScreen;

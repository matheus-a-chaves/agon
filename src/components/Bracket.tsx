import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Box, Text, Image, Center, VStack, HStack, IconButton, View } from 'native-base';
import Svg, { Line } from 'react-native-svg';
import { useAuth } from '../contexts/Auth';
import QuartasEsquerda from './Chavemento/QuartasEsquerda';
import SemiEsquerda from './Chavemento/SemiEsquerda';
import TeamsContainer from './Chavemento/TeamsContainer';
import QuartasDireita from './Chavemento/QuartasDireita';
import SemiDireita from './Chavemento/SemiDireita';
import OitavasEsquerda from './Chavemento/OitavasEsquerda';
import OitavasDireita from './Chavemento/OitavasDireita';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { Chaveamento } from '../screens/campeonato/ChaveamentoScreen';

interface BracketProps {
    oitavasDireita: Chaveamento[];
    oitavasEsquerda: Chaveamento[];
    quartasEsquerda: Chaveamento[];
    quartasDireita: Chaveamento[];
    semiEsquerda: Chaveamento[];
    semiDireita: Chaveamento[];
    finalEsquerda: Chaveamento[];
    finalDireita: Chaveamento[];
    champion: Chaveamento[];
    isAparence: number;
}

const Bracket: React.FC<BracketProps> = ({
    oitavasDireita,
    oitavasEsquerda,
    quartasEsquerda,
    quartasDireita,
    semiEsquerda,
    semiDireita,
    finalEsquerda,
    finalDireita,
    champion,
    isAparence
}) => {

    const { setTabBarVisibility } = useAuth();
    const navigation = useNavigation();
    setTabBarVisibility(false);

    return (<LinearGradient
        colors={['#004AAD', '#7ED957']}
        style={{ width: '100%', height: '100%' }}>
        <ScrollView>

            <HStack h={'100%'}>

                <Center flex={1} py={4} px={2} >
                    <HStack w={'full'} >
                        <IconButton
                            icon={<Ionicons name="arrow-back" size={26} color="#fff" />}
                            onPress={() => {
                                Orientation.unlockAllOrientations();
                                navigation.goBack()
                                setTabBarVisibility(true);
                            }}
                        />
                        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
                            <Text color="white" fontSize="xl" >Chaveamento</Text>
                        </Box>
                    </HStack>
                    <Box flexDirection={'row'}>
                        <Box flexDirection="row">
                            {
                                isAparence === 8 && (<OitavasEsquerda oitavasEsquerda={oitavasEsquerda} />)
                            }
                            {
                                isAparence >= 4 && (<QuartasEsquerda quartasEsquerda={quartasEsquerda} />)
                            }

                            <SemiEsquerda semiEsquerda={semiEsquerda} />
                            <Box flexDirection="column" justifyContent="center">
                                <TeamsContainer teams={finalEsquerda} />
                            </Box>
                        </Box>
                        <VStack alignItems="center" py={'5px'} justifyContent={'center'} space={2}>
                            <Image source={require("../assets/icons/trofeu.png")} alt={"trofeu"} w={"60px"} />
                            <TeamsContainer teams={champion} />
                            <Text fontSize="xl" color="white">Campeão</Text>
                        </VStack>
                        <Box flexDirection="row">
                            <Box flexDirection="column" justifyContent="center">
                                <TeamsContainer teams={finalDireita} />
                            </Box>
                            <SemiDireita semiDireita={semiDireita} />
                            {
                                isAparence >= 4 && (<QuartasDireita quartasDireita={quartasDireita} />)
                            }

                            {
                                isAparence === 8 && (<OitavasDireita oitavasDireita={oitavasDireita} />)
                            }

                        </Box>
                    </Box>
                </Center >

            </HStack>

        </ScrollView>
    </LinearGradient>
    );
};





export default Bracket;

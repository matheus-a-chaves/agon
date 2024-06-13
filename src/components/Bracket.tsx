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

const screenWidth = Dimensions.get('window').width;



export interface Team {
    id: number;
    name: string;
    logo: string;
}

interface BracketProps {
    oitavasEsquerda: Team[];
    quartasEsquerda: Team[];
    quartasDireita: Team[];
    semiEsquerda: Team[];
    semiDireita: Team[];
    finalEsquerda: Team[];
    finalDireita: Team[];
    champion: Team[];
}

const Bracket: React.FC<BracketProps> = ({
    oitavasEsquerda,
    quartasEsquerda,
    quartasDireita,
    semiEsquerda,
    semiDireita,
    finalEsquerda,
    finalDireita,
    champion }) => {

    const { setTabBarVisibility } = useAuth();
    const navigation = useNavigation();
    setTabBarVisibility(false);

    return (
        <ScrollView>
            <HStack bg={"#444"}>
                <LinearGradient
                    colors={['#004AAD', '#7ED957']}
                    style={{ width: '100%', height: '100%' }}>
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
                                <OitavasEsquerda oitavasEsquerda={oitavasEsquerda} />
                                <QuartasEsquerda quartasEsquerda={quartasEsquerda} />
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
                                <QuartasDireita quartasDireita={quartasDireita} />
                                <OitavasDireita oitavasDireita={oitavasEsquerda} />
                            </Box>
                        </Box>
                    </Center >
                </LinearGradient>
            </HStack>
        </ScrollView>
    );
};





export default Bracket;

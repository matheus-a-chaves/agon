import React from 'react';
import { Box, Image, VStack } from 'native-base';
import { Text } from 'react-native-svg';


interface EquipeVersusProps {
    equipes: {
        equipe1: any;
        equipe2: any;
    };
}

const EquipeVersus: React.FC<EquipeVersusProps> = ({ team }: any) => {
    return (
        <VStack key={team.id} space={'1px'} py={'2px'} alignItems="center">
            <Box background={"#FFFBFB"} borderRadius={"10px"} p={'2px'}>
                <Image source={{ uri: team.logo }} alt={team.name} size={'50px'} />
                <Text>X</Text>
                <Image source={{ uri: team.logo }} alt={team.name} size={'50px'} />
            </Box>
        </VStack>
    );
};

export default EquipeVersus;

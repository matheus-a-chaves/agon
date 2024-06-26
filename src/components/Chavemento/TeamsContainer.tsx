import React from 'react';
import { Box, Image, VStack } from 'native-base';
import { imageConverter } from '../../screens/Utils';
import { Chaveamento } from '../../screens/campeonato/ChaveamentoScreen';

interface TeamsContainerProps {
    teams: Chaveamento[];
}

const TeamsContainer: React.FC<TeamsContainerProps> = ({ teams }) => {
    return (
        <>
            {teams.map((team) => (
                <VStack key={team.id} space={'1px'} py={'2px'} alignItems="center">
                    <Box background={"#FFFBFB"} borderRadius={"10px"} p={'2px'}>
                        <Image borderRadius='10px' source={imageConverter(team.logo, require('../../assets/imagemfundo.jpg'))} alt={team.name} size={'50px'} />
                    </Box>
                </VStack>
            ))}
        </>
    );
};

export default TeamsContainer;

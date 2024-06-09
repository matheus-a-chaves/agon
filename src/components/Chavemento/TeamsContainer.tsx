import React from 'react';
import { Box, Image, VStack } from 'native-base';
import { Team } from '../Bracket';

interface TeamsContainerProps {
    teams: Team[];
}

const TeamsContainer: React.FC<TeamsContainerProps> = ({ teams }) => {
    return (
        <>
            {teams.map((team) => (
                <VStack key={team.id} space={'1px'} py={'2px'} alignItems="center">
                    <Box background={"#FFFBFB"} borderRadius={"10px"} p={'2px'}>
                        <Image source={{ uri: team.logo }} alt={team.name} size={'50px'} />
                    </Box>
                </VStack>
            ))}
        </>
    );
};

export default TeamsContainer;

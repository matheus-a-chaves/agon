import React from 'react';
import { Box } from 'native-base';
import TeamsContainer from './TeamsContainer';
import { Team } from '../Bracket';

interface QuartasDireitaProps {
    quartasDireita: Team[];
}

const QuartasDireita: React.FC<QuartasDireitaProps> = ({ quartasDireita }) => {
    return (
        <Box flexDirection="row">
            <Box flexDirection="column" justifyContent="space-around" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'}></Box>
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'}></Box>
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"2px"}>
                <Box background={'#FFF'} width={'2px'} h={'26%'} borderRadius={'2px'}></Box>
                <Box background={'#FFF'} width={'2px'} h={'26%'} borderRadius={'2px'}></Box>
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'}></Box>
                <Box background={'#FFF'} width={'100%'} h={'2px'}></Box>
                <Box background={'#FFF'} width={'100%'} h={'2px'}></Box>
                <Box background={'#FFF'} width={'100%'} h={'2px'}></Box>
            </Box>
            <Box flexDirection="column" justifyContent="space-around">
                <TeamsContainer teams={quartasDireita} />
            </Box>
        </Box>
    );
};

export default QuartasDireita;

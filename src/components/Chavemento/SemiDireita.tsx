import React from 'react';
import { Box } from 'native-base';
import TeamsContainer from './TeamsContainer';
import { Team } from '../Bracket';

interface SemiDireitaProps {
    semiDireita: Team[];
}

const SemiDireita: React.FC<SemiDireitaProps> = ({ semiDireita }) => {
    return (
        <Box flexDirection="row">
            <Box flexDirection="column" justifyContent="center" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"2px"}>
                <Box background={'#FFF'} width={'2px'} h={'51%'} borderRadius={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around">
                <TeamsContainer teams={semiDireita} />
            </Box>
        </Box>
    );
};

export default SemiDireita;

import React from 'react';
import { Box } from 'native-base';
import TeamsContainer from './TeamsContainer';
import { Team } from '../Bracket';

interface OitavasDireitaProps {
    oitavasDireita: Team[];
}

const OitavasDireita: React.FC<OitavasDireitaProps> = ({ oitavasDireita }) => {
    return (
        <Box flexDirection="row">
            <Box flexDirection="column" justifyContent="space-around" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} borderRadius={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"2px"}>
                <Box background={'#FFF'} width={'2px'} h={'13%'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'2px'} h={'13%'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'2px'} h={'13%'} borderRadius={'2px'} />
                <Box background={'#FFF'} width={'2px'} h={'13%'} borderRadius={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around" w={"20px"}>
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
                <Box background={'#FFF'} width={'100%'} h={'2px'} />
            </Box>
            <Box flexDirection="column" justifyContent="space-around">
                <TeamsContainer teams={oitavasDireita} />
            </Box>
        </Box>
    );
};

export default OitavasDireita;

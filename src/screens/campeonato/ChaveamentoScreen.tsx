import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Bracket from '../../components/Bracket';
import { useAuth } from '../../contexts/Auth';
import Orientation from 'react-native-orientation-locker';

const ChaveamentoScreen: React.FC = () => {

    useEffect(() => {
        Orientation.lockToLandscape();
    }, []);

    const oitavasEsquerda = [
        { id: 1, name: 'Grêmio', logo: 'https://i.pinimg.com/originals/7a/1e/15/7a1e15de2e0df008f2de954199b29f0d.png' },
        { id: 2, name: 'Athletico-PR', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3458.png' },
        { id: 3, name: 'São Paulo', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png' },
        { id: 4, name: 'Palmeiras', logo: 'https://w7.pngwing.com/pngs/107/499/png-transparent-palmeiras-hd-logo-thumbnail.png' },
        { id: 5, name: 'Santos', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/1200px-Santos_logo.svg.png' },
        { id: 6, name: 'Corinthians', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png' },
        { id: 7, name: 'Sport', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/7635.png' },
        { id: 8, name: 'CSA', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/CSA_logo.png' },
    ];

    const quartasEsquerda = [
        { id: 1, name: 'Grêmio', logo: 'https://i.pinimg.com/originals/7a/1e/15/7a1e15de2e0df008f2de954199b29f0d.png' },
        { id: 2, name: 'Athletico-PR', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3458.png' },
        { id: 3, name: 'São Paulo', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png' },
        { id: 4, name: 'Palmeiras', logo: 'https://w7.pngwing.com/pngs/107/499/png-transparent-palmeiras-hd-logo-thumbnail.png' },
    ];

    const quartasDireita = [
        { id: 5, name: 'Santos', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/1200px-Santos_logo.svg.png' },
        { id: 6, name: 'Corinthians', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png' },
        { id: 7, name: 'Sport', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/7635.png' },
        { id: 8, name: 'CSA', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/CSA_logo.png' },
    ];

    const semiEsquerda = [
        { id: 2, name: 'Athletico-PR', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/3458.png' },
        { id: 3, name: 'São Paulo', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png' },
    ];

    const semiDireita = [
        { id: 5, name: 'Santos', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/1200px-Santos_logo.svg.png' },
        { id: 7, name: 'Sport', logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/7635.png' },
    ];
    const finalDireita = [
        { id: 5, name: 'Santos', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Santos_logo.svg/1200px-Santos_logo.svg.png' },
    ];
    const finalEsquerda = [
        { id: 3, name: 'São Paulo', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png' },
    ];

    const champion = [
        { id: 3, name: 'São Paulo', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png' },
    ];

    return (
        <NativeBaseProvider>
            <Bracket
                oitavasDireita={oitavasEsquerda}
                oitavasEsquerda={oitavasEsquerda}
                quartasEsquerda={quartasEsquerda}
                quartasDireita={quartasDireita}
                semiDireita={semiDireita}
                semiEsquerda={semiEsquerda}
                finalDireita={finalDireita}
                finalEsquerda={finalEsquerda}
                champion={champion} />
        </NativeBaseProvider>
    );
};

export default ChaveamentoScreen;

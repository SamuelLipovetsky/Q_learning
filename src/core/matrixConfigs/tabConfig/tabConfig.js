
import React, { useState, useContext } from 'react';
import "./tabConfig.css"
import DrawRadioButtons from '../drawConfig/drawConfig';
import Graphs from '../graphs/graphs';
import { ConfigContext } from "../../main/main"
function TabConfig(props) {

    const [tabsToShow, setTatbsToShow] = useState([false, false, true, false    ])
    const { isPlaying, setIsPlaying, drawData, setDrawData, stuff } = useContext(ConfigContext);

    const handleClick = (displays, resetDrawData) => {
        setTatbsToShow(displays, resetDrawData)
        if (resetDrawData) {
            setDrawData(5)
        }
    }

    return (

        <div className='tabs-wrapper'>
            <div className='tabs-menu'>
                <div className={`tab show-tab-${tabsToShow[0]}`} style={{
                    borderRight: "solid 1px", borderTop: "solid 1px",
                    borderLeft: "solid 1px", borderTopLeftRadius: "2vh"
                }}
                    onClick={() => handleClick([true, false, false, false], true)}>
                    Mostrar gráficos</div>

                <div className={`tab show-tab-${tabsToShow[1]}`} style={{
                    borderRight: "solid 1px",
                    borderTop: "solid 1px"
                }}
                    onClick={() => handleClick([false, true, false, false], false)}>
                    Alterar células</div>

                <div className={`tab show-tab-${tabsToShow[2]}`} style={{
                    borderRight: "solid 1px",
                    borderTop: "solid 1px"
                }}
                    onClick={() => handleClick([false,false, true, false],true)}>Ajuda</div>

                <div className={`tab show-tab-${tabsToShow[3]}`} style={{
                    borderRight: 'solid 1px',
                    borderTop: 'solid 1px', borderTopRightRadius: "2vh"
                }}
                    onClick={() => handleClick([false, false, false,true], true)}>
                    Alterar variáveis</div>
            </div>
            <div className='tabs-content'>

                <div className={`content show-content-${tabsToShow[0]} `} >

                    <Graphs></Graphs>

                </div>
                <div className={`content show-content-${tabsToShow[1]}`} >
                    <DrawRadioButtons></DrawRadioButtons>
                </div>
                <div className={`content show-content-${tabsToShow[2]}`} >
                    <p> Introdução e objetivos</p>
                    <div>
                    Olá, esse site é uma  demonstração do Q-learning,
                    uma tecnica de apredizado por reforço. O objetivo do agente
                    (a celula branca) é chegar na recompensa ( celula verde), sem 
                    cair nas celulas vermelhas (derrotas).
                    </div>
                    <p>Funcionamento</p>
                    <div>

                    </div>
                    Inicialmente, o agente  assume caminhos
                    semi aletórios ,até encontrar recompensas ou derrotas ,e assim vai alterando
                    as instruçoes de movimento de cada celula representada pela seta.
                    OBS: dependendo da dificuldade do grid, o agente poderá tomar mais ou menos
                    tempo para aprender o caminho ideal. 
                    <p>Funcionalidades</p>
                    <div>

                    
                    Observe os gráficos do aprenzidao clicando
                    nas aba "Mostrar gŕaficos". Altere as celulas do grid da maneira que desejar
                    clicando em "Alterar Celulas" e mude as variáveis de aprenzidao na aba " Alterar
                    variáveis". Ainda, se não quiser esperar o treinamento do agente, é possível 
                    tornar o aprenzidado mais rápido  clicando no botão "Adiantar treinamento"
                    </div>
                   
                </div>
                <div className={`content show-content-${tabsToShow[3]}`} >
                    Variáveis
                </div>
            </div>
        </div>
    );
}

export default TabConfig;

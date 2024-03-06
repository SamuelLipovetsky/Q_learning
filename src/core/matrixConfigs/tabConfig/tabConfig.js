
import React, { useState, useContext } from 'react';
import "./tabConfig.css"
import DrawRadioButtons from '../drawConfig/drawConfig';
import Graphs from '../graphs/graphs';
import { ConfigContext } from "../../main/main"
import VarConfig from '../varConfig/varConfig';
function TabConfig(props) {


    const [tabsToShow, setTatbsToShow] = useState([false, false, true, false])
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
                    Alterar   <br></br>células</div>

                <div className={`tab show-tab-${tabsToShow[2]}`} style={{
                    borderRight: "solid 1px",
                    borderTop: "solid 1px"
                }}
                    onClick={() => handleClick([false, false, true, false], true)}>Ajuda</div>

                <div className={`tab show-tab-${tabsToShow[3]}`} style={{
                    borderRight: 'solid 1px',
                    borderTop: 'solid 1px', borderTopRightRadius: "2vh"
                }}
                    onClick={() => handleClick([false, false, false, true], true)}>
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
                <p style={{textAlign:"center"}}> Legenda</p>
                    <div style={{width:"80%",display:'grid',gridTemplateRows:"1fr 1fr",gridTemplateColumns:"1fr 1fr"}}>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"right",margin:"0.5em"}}>
                            <div style={{display:'grid',placeItems:"center",marginRight:"0.2em"}}>Agente  </div>
                            <div style={{backgroundColor:"white",width:"1.5em",height:"1.5em"}}> </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"right",margin:"0.5em"}}>
                            <div style={{display:'grid',placeItems:"center",marginRight:"0.2em"}}>Vitória  </div>
                            <div style={{backgroundColor:"#0e5c16",width:"1.5em",height:"1.5em"}}> </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"right",margin:"0.5em"}}>
                            <div style={{display:'grid',placeItems:"center",marginRight:"0.2em"}}>Derrota  </div>
                            <div style={{backgroundColor:"#a70f16",width:"1.5em",height:"1.5em"}}> </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"row",justifyContent:"right",margin:"0.5em"}}>
                            <div style={{display:'grid',placeItems:"center",marginRight:"0.2em"}}> Obstáculo  </div>
                            <div style={{backgroundColor:"black",width:"1.5em",height:"1.5em"}}> </div>
                        </div>
                    </div>
                    <p style={{textAlign:"center"}}> Introdução e objetivos</p>
                    <div style={{fontSize:"1em"}}>
                        Olá, esse site é uma  demonstração do Q-learning,
                        uma tecnica de apredizado por reforço. O objetivo do agente
                        (a celula branca) é chegar na recompensa ( celula verde), sem
                        cair nas celulas vermelhas (derrotas).
                    </div>
                    <p style={{textAlign:"center"}}>Funcionamento</p>
                    <div style={{fontSize:"1em"}}>


                        Inicialmente, o agente  assume caminhos
                        semi aletórios ,até encontrar recompensas ou derrotas ,e assim vai alterando
                        as instruçoes de movimento de cada celula representada pela seta. Ainda,
                        para introduzir incerteza , existe uma chance que o agente tome um passo em
                        uma direção aleatória.
                        OBS: dependendo da dificuldade do grid, o agente poderá tomar mais ou menos
                        tempo para aprender o caminho ideal.
                    </div>
                    <p style={{textAlign:"center"}}>Funcionalidades</p>
                    <div style={{fontSize:"1em"}}>


                        Observe os gráficos do aprendizado clicando
                        nas aba "Mostrar gŕaficos". Altere as celulas do grid da maneira que desejar
                        clicando em "Alterar células" e mude as variáveis de aprendizado na aba " Alterar
                        variáveis". Ainda, se não quiser esperar o treinamento do agente, é possível
                        tornar o aprenzidado mais rápido  clicando no botão "Adiantar treinamento"
                    </div>

                </div>
                <div className={`content show-content-${tabsToShow[3]}`} >
                    <VarConfig></VarConfig>
                </div>
            </div>
        </div>
    );
}

export default TabConfig;

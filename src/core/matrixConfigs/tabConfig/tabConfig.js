
import React, { useState, useContext } from 'react';
import "./tabConfig.css"

import Graphs from '../graphs/graphs';
import { ConfigContext } from "../../main/main"
import VarConfig from '../varConfig/varConfig';
import DrawButtons from '../drawConfig/drawConfig';
import { GoGraph } from "react-icons/go";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbVariable } from "react-icons/tb";
import { HiOutlineTableCells } from "react-icons/hi2";
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
            <div className='tabs-menu' style={{cursor:"pointer"}}>
                <div className={`tab show-tab-${tabsToShow[0]}`} style={{
                    borderRight: "solid 1px white", borderTop: "solid 1px white",
                    borderLeft: "solid 1px white", borderTopLeftRadius: "2vh",
                    
                }}
                    onClick={() => handleClick([true, false, false, false], true)}>
                     <GoGraph />  Gráficos</div>

                <div className={`tab show-tab-${tabsToShow[1]}`} style={{
                    borderRight: "solid 1px white",
                    borderTop: "solid 1px white",
                    
                }}
                    onClick={() => handleClick([false, true, false, false], false)}>
                   <HiOutlineTableCells /> Células </div>

                <div className={`tab show-tab-${tabsToShow[2]}`} style={{
                    borderRight: "solid 1px white",
                    borderTop: "solid 1px white",
                    
                }}
                    onClick={() => handleClick([false, false, true, false], true)}>
                        <IoMdHelpCircleOutline />Ajuda</div>

                <div className={`tab show-tab-${tabsToShow[3]}`} style={{
                    borderRight: 'solid 1px white',
                    borderTop: 'solid 1px white',
                     borderTopRightRadius: "2vh"
                }}
                    onClick={() => handleClick([false, false, false, true], true)}>
                     <TbVariable /> Variáveis</div>
            </div>
            <div className='tabs-content' >

                <div className={`content show-content-${tabsToShow[0]} `} >

                    <Graphs></Graphs>

                </div>
                <div className={`content show-content-${tabsToShow[1]}`} >
                    <DrawButtons></DrawButtons>
                </div>
                <div className={`content show-content-${tabsToShow[2]}`} >
                    <p style={{ textAlign: "center",fontSize:"2.8vm" }}> Legenda</p>
                    <div style={{ width: "80%", display: 'grid', gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", margin: "0.5em" }}>
                            <div style={{ display: 'grid', placeItems: "center", marginRight: "0.2em",fontSize:  "2.4vmin" }}>Agente  </div>
                            <div style={{ backgroundColor: "white", width: "1.5em", height: "1.5em",opacity:"0.8" }}> </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", margin: "0.5em" }}>
                            <div style={{ display: 'grid', placeItems: "center", marginRight: "0.2em",fontSize:  "2.4vmin" }}>Vitória  </div>
                            <div style={{ backgroundColor: "#0e5c16", width: "1.5em", height: "1.5em",opacity:"0.8" }}> </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", margin: "0.5em" }}>
                            <div style={{ display: 'grid', placeItems: "center", marginRight: "0.2em",fontSize:  "2.4vmin" }}>Derrota  </div>
                            <div style={{ backgroundColor: "#a70f16", width: "1.5em", height: "1.5em",opacity:"0.8" }}> </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "right", margin: "0.5em" }}>
                            <div style={{ display: 'grid', placeItems: "center", marginRight: "0.2em",fontSize:  "2.4vmin" }}> Obstáculo  </div>
                            <div style={{ backgroundColor: "black", width: "1.5em", height: "1.5em",opacity:"0.8" }}> </div>
                        </div>
                    </div>
                    <div style={{width:"90%",margin:"auto"}}>


                        <p style={{ textAlign: "center",fontSize:"2.8vm" }}> Introdução e objetivos</p>
                        <div style={{  fontSize:  "2.4vmin" }}>
                            Olá, esse site é uma  demonstração do Q-learning,
                            uma tecnica de apredizado por reforço. O objetivo do agente
                            (a celula branca) é chegar na recompensa ( celula verde), sem
                            cair nas celulas vermelhas (derrotas).
                        </div>
                        <p style={{ textAlign: "center" }}>Funcionamento</p>
                        <div style={{  fontSize:  "2.4vmin" }}>


                            Inicialmente, o agente  assume caminhos
                            semi aletórios ,até encontrar recompensas ou derrotas ,e assim vai alterando
                            as instruçoes de movimento de cada celula representada pela seta. Ainda,
                            para introduzir incerteza , existe uma chance que o agente tome um passo em
                            uma direção aleatória.
                            OBS: dependendo da dificuldade do grid, o agente poderá tomar mais ou menos
                            tempo para aprender o caminho ideal.
                        </div>
                        <p style={{ textAlign: "center" }}>Funcionalidades</p>
                        <div style={{  fontSize:  "2.4vmin" }}>


                            Observe os gráficos do aprendizado clicando
                            nas aba "Mostrar gŕaficos". Altere as celulas do grid da maneira que desejar
                            clicando em "Alterar células" e mude as variáveis de aprendizado na aba " Alterar
                            variáveis". Ainda, se não quiser esperar o treinamento do agente, é possível
                            tornar o aprenzidado mais rápido  clicando no botão "Adiantar treinamento"
                        </div>
                    </div>

                </div>
                <div className={`content show-content-${tabsToShow[3]}`} style={{width:"90%",margin:"auto"}} >
                    <VarConfig></VarConfig>
                </div>
            </div>
        </div>
    );
}

export default TabConfig;

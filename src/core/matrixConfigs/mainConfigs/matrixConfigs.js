
import React, { useState, useContext } from 'react';
import DrawButtonCluster from '../drawButton/drawButtonCluster';
import { ConfigContext } from "../../main/main"
import ConfigCell from './configCell';
import "./matrixConfig.css"
function MatrixConfigs(props) {

    const [openMenu, setOpenMenu] = useState("none")
    const [showComponents, setShowComponents] =useState([false,false,false])
    const handleclick = (newShowComponents) =>{
        console.log(showComponents)
        setShowComponents(()=>{return newShowComponents})
        
    }
    return (
        <div className='menu'>
            <button  className='cell'onClick={()=>handleclick([true,false,false])} >
                <ConfigCell title={"Alterar as Celulas"} showComponent={showComponents[0]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </button>
            <button  className='cell'onClick={()=>handleclick([false,true,false])} >
                <ConfigCell title={"Alterar Variáveis"} showComponent={showComponents[1]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </button>
            <button   className='cell' onClick={()=>handleclick([false,false,true])} >
                <ConfigCell title={"Mostrar gráficos"} showComponent={showComponents[2]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </button>
        </div>
    );
}

export default MatrixConfigs;

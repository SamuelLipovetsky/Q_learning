
import React, { useState, useContext } from 'react';
import DrawButtonCluster from '../drawButton/drawButtonCluster';
import { ConfigContext } from "../../main/main"
import ConfigCell from './configCell';
import "./matrixConfig.css"
function MatrixConfigs(props) {

    const [openMenu, setOpenMenu] = useState(0)
    const [showComponents, setShowComponents] =useState([false,false,false])
    const handleclick = (newShowComponents) =>{
        

        if(newShowComponents.indexOf(true)!=showComponents.indexOf(true)){
        setShowComponents([false,false,false])
        setOpenMenu(newShowComponents.indexOf(true) +1)

        // setShowComponents(()=>{return newShowComponents})
        setTimeout(() => {
            setShowComponents(newShowComponents);
           
        }, 501);
    }
        
    }
    return (
        <div className={`menu options-${openMenu}`}>
            <div  className='cell'onClick={()=>handleclick([true,false,false])} >
                <ConfigCell title={"Celulas"} showComponent={showComponents[0]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </div>
            <div  className='cell'onClick={()=>handleclick([false,true,false])} >
                <ConfigCell title={"Variáveis"} showComponent={showComponents[1]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </div>
            <div   className='cell' onClick={()=>handleclick([false,false,true])} >
                <ConfigCell title={"Gráficos"} showComponent={showComponents[2]}
                    component={<DrawButtonCluster />}></ConfigCell>
            </div>
            
        </div>
    );
}

export default MatrixConfigs;

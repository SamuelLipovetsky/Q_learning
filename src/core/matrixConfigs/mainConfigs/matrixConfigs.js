
import React, { useState, useContext } from 'react';
import DrawButtonCluster from '../drawButton/drawButtonCluster';
import { ConfigContext } from "../../main/main"
import ConfigCell from './configCell';
import DrawRadioButtons from '../drawConfig/drawConfig';
import "./matrixConfig.css"
function MatrixConfigs(props) {

    const [openMenu, setOpenMenu] = useState(0)
    const [showComponents, setShowComponents] =useState([false,false,false])
    const handleclick = (newShowComponents) =>{
        

        if(newShowComponents.indexOf(true)!=showComponents.indexOf(true)){
        // setShowComponents([false,false,false])

        setShowComponents(newShowComponents);
        setOpenMenu(newShowComponents.indexOf(true) +1)

            
            
           
        
    }
        
    }
    return (
        <div className={`menu options-${openMenu}`}>
            <div  className={`cell ${showComponents[0]} top`}onClick={()=>handleclick([true,false,false])} >
                <ConfigCell   title={"Celulas"} showComponent={showComponents[0]}
                    component={<DrawRadioButtons></DrawRadioButtons>}></ConfigCell>
            </div>
            <div  className={`cell ${showComponents[1]} mid`} onClick={()=>handleclick([false,true,false])} >
                <ConfigCell   title={"Variáveis"} showComponent={showComponents[1]}
                    component={<DrawRadioButtons></DrawRadioButtons>}></ConfigCell>
            </div>
            <div   className={`cell ${showComponents[2]} bot`} onClick={()=>handleclick([false,false,true])} >
                <ConfigCell   title={"Gráficos"} showComponent={showComponents[2]}
                    component={<DrawRadioButtons></DrawRadioButtons>}></ConfigCell>
            </div>
            
        </div>
    );
}

export default MatrixConfigs;

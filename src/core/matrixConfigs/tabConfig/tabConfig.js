
import React, { useState, useContext } from 'react';
import "./tabConfig.css"
import DrawRadioButtons from '../drawConfig/drawConfig';
import Graphs from '../graphs/graphs';
function TabConfig(props) {

    const [tabsToShow, setTatbsToShow] = useState([true, false, false])

    const handleClick = (value) => {
        setTatbsToShow(value)
    }
    return (

        <div className='tabs-wrapper'>
            <div className='tabs-menu'>
                <div className={`tab show-tab-${tabsToShow[0]}`} style={{ borderRight: "solid 1px", borderTop: "solid 1px", borderLeft: "solid 1px", borderTopLeftRadius: "2vh" }} onClick={() => handleClick([true, false, false])}>Gráficos</div>
                <div className={`tab show-tab-${tabsToShow[1]}`} style={{ borderRight: "solid 1px", borderTop: "solid 1px" }} onClick={() => handleClick([false, true, false])}>Celulas</div>
                <div className={`tab show-tab-${tabsToShow[2]}`} style={{ borderRight: 'solid 1px', borderTop: 'solid 1px', borderTopRightRadius: "2vh" }} onClick={() => handleClick([false, false, true])}>Variáveis</div>
            </div>
            <div className='tabs-content'>
                <div className={`content show-content-${tabsToShow[0]} `} >
                    
                    <Graphs></Graphs>
              
                </div>
                <div className={`content show-content-${tabsToShow[1]}`} >
                    <DrawRadioButtons></DrawRadioButtons>
                </div>
                <div className={`content show-content-${tabsToShow[2]}`} >

                </div>
            </div>
        </div>
    );
}

export default TabConfig;

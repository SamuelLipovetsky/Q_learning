
import React, { useState, useContext } from 'react';


function ConfigCell(props) {
    let toRender
    if(props.showComponent==false){
        toRender =props.title
    }
    else{
        toRender =props.component
    }
    return ( toRender);
}

export default ConfigCell;

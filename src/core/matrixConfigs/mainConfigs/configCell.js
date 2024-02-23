
import React, { useState, useContext } from 'react';

import {ConfigContext}  from "../../main/main"
function ConfigCell(props) {
    let toRender
    if(props.showComponent==false){
        toRender =props.title
    }
    else{
        toRender =props.component
    }
    return (
        <div>
          {toRender}
        </div>
    );
}

export default ConfigCell;

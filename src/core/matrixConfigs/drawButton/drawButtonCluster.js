
import React, { useState, useContext } from 'react';
import DrawButton from './drawButton';

function DrawButtonCluster(props) {

 
    return (
        <div className='cluster'>
            <div>
                <DrawButton
                    option={2} title={"obtaculo"}></DrawButton>
            </div>
            <div>
                <DrawButton
                    option={4} title={"Recompensa"}></DrawButton>
            </div>
            <div>
                <DrawButton
                    option={3} title={"punição"}></DrawButton>
            </div>
            

        </div>
    );
}

export default DrawButtonCluster;

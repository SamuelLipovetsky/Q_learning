import React from 'react';
import * as utils from "../main/aux-functions"

function ArrowDisplay({ numbers, type,index,matrix }) {

    let arrow;
    // console.log(type)
    
    if (type != 0 && type !=1) {
        arrow=""
    }
    else {
        let actions =utils.getAvailableActions(matrix,index)
        const filteredNumbers = numbers.filter((_, index) => actions.includes(index));
        const maxNumber = Math.max(...filteredNumbers);
        const count = numbers.filter(num => num === maxNumber).length;

        


        const maxIndex =numbers.indexOf(maxNumber)
     
        
        if (count === 1 ) {
            
            // const maxIndex = numbers.indexOf(maxNumber);
            
            if (maxIndex === 0) {
                arrow = '↑';
            } else if (maxIndex === 1) {
                arrow = '→';
            } else if (maxIndex === 2) {
                arrow = '↓';
            } else if (maxIndex === 3) {
                arrow = '←';
            }
        } else {
            arrow = '•'; // Dot if max number appears more than once
        }

    }
    return (
        <div style={{ width: "100%", height: "100%", color: "white", fontSize: "1.3em", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {arrow}
            {/* <div style={{display:"flex",flexDirection:"column",fontSize:"0.5em"}}>
            {numbers[0].toFixed(2)}<br></br>
            {numbers[1].toFixed(2)}<br></br>
            {numbers[2].toFixed(2)}<br></br>
            {numbers[3].toFixed(2)}<br></br>
            </div>
        */}
        </div>
    );
}


export default ArrowDisplay;
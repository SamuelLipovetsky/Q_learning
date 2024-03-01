import React from 'react';
function ArrowDisplay({ numbers, type }) {

    let arrow;
    // console.log(type)
    
    if (type != 0) {
        arrow=""
    }
    else {
        const nonZeroNumbers = numbers.filter(num => num !== 0);
        const maxNumber = Math.max(...nonZeroNumbers);
        const count = nonZeroNumbers.filter(num => num === maxNumber).length;

       
        const processedNumbers = numbers.map(num => (num === 0 ? -100 : num));
        if (count === 1) {
            const maxIndex = processedNumbers.indexOf(maxNumber);

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
        </div>
    );
}

export default ArrowDisplay;
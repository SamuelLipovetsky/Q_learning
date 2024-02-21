import React from 'react';
function ArrowDisplay({ numbers }) {

    const nonZeroNumbers = numbers.filter(num => num !== 0);
    const maxNumber = Math.max(...nonZeroNumbers);
    const count = nonZeroNumbers.filter(num => num === maxNumber).length;

    let arrow;
    const processedNumbers = numbers.map(num => (num === 0 ? -100 : num));
    if (count === 1) {
        const maxIndex = processedNumbers.indexOf(maxNumber);

        if (maxIndex === 0) {
            arrow = '←';
        } else if (maxIndex === 1) {
            arrow = '↓';
        } else if (maxIndex === 2) {
            arrow = '→';
        } else if (maxIndex === 3) {
            arrow = '↑ ';
        }
    } else {
        arrow = '•'; // Dot if max number appears more than once
    }

   
    return (
        <div>
            {arrow}
        </div>
    );
}

export default ArrowDisplay;
import React, { useState } from 'react';

import "./drawConfig.css"
function DrawRadioButtons() {
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(event)
    };

    return (
        <div className='container'>
            <div style={{fontSize:"1em"}}>
                Celulas
            </div>
            <div className='radio'>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                        />
                        Option 1
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                        />
                        Option 2
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                        />
                        Option 3
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="option4"
                            checked={selectedOption === 'option4'}
                            onChange={handleOptionChange}
                        />
                        Option 4
                    </label>
                </div>


            </div>
            <div>
                
            </div>
        </div>
    );
}

export default DrawRadioButtons;

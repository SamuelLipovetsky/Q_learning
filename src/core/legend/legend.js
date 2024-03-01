

import "./legend.css"
function CellLegend(props) {

    
    
    return (
        <div className={`menu`}>
            <div  className={`cell  top-l false`} >
                Obstculo
            </div>
            <div  className={`cell mid-l false`} >
                Vitória
            </div>
            <div   className={`cell  bot-l false`}  >
                Derrota
            </div>
            
        </div>
    );
}

export default CellLegend;

import React from 'react';
import './Checkmark.css'; // Import your CSS file

const Checkmark = (prop) => {

  const display =()=>{
   
    if(prop.prop){
        return "checkmark"
    }
    else{
        return "disabled"
    }
  }
  return (
    <div style={{position:"absolute"}}>
           <div className={display()}> Variáveis alteradas com sucesso</div>
    </div>
   
    
  );
};

export default Checkmark;

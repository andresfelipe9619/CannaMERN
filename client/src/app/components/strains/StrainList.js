import React, { Component } from 'react';
import Strain from './Strain'
const StrainList = props =>{
    return ( 
            <div className="row">
                {props.strains.map(strain=>{
                    return (
                        <Strain strain={strain} key={strain.name}/>
                    )
                })}
            </div>  
    );
}
export default StrainList;
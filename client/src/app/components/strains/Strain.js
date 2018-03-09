import React, {Component} from 'react';
import { Link } from 'react-router-dom';
const Strain = props => {
    return (
        <div className="col-md-3">
        <div className="well text-center">
            <img className="list-item-img" src={props.strain.image} />
            <h5>{props.strain.name}</h5>
            <Link className="btn btn-primary" to="/strain">Details</Link>
        </div>
    </div>
    );
}

export default Strain;
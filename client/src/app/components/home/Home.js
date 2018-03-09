import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (
            <div className="jumbotron">
            <div className="col-md-12">
            <h1 className="display-4">A Nice Cannabis MERN App!</h1>
                <p className="lead">Find all your favorites strains, edibles and more</p>
                <p className="lead">Sign up for receiving fresh cannabis info.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Sign Up</a>
                </p>
            </div>
            </div>
        );
    }
}


export default Home;

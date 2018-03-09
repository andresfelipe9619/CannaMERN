import React, {Component} from 'react';
import {connect} from "react-redux";
import StrainList from './components/strains/StrainList';
import {fetchStrains} from './actions/strainsActions'
import Home from './components/home/Home';
import Navbar from './components/header/Navbar';
import About from './components/about/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {Route, Switch} from 'react-router';
import { withRouter } from 'react-router'
import './App.css';

class App extends Component {

  componentDidMount() {
    this
      .props
      .getStrains();
  }

  render() {
    console.log(this.props);
    if (this.props.hasErrored) {
      return (
        <h1>Error</h1>
      )
    } else {
      return (
        <div>
          <header>
            <Navbar></Navbar>
          </header>
          <main>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                  </Switch>
                </div>
              </div>
              <StrainList strains={this.props.strains}/>
            </div>
          </main>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {strains: state.homeLoaded, isLoading: state.homeLoading, hasErrored: state.homeErrored};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStrains: () => {
      dispatch(fetchStrains());
    }
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

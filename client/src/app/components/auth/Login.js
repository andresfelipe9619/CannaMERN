import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <div col-md-6 text-center>
                    <form className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address"
                            required
                            autofocus/>
                        <input
                            type="password"
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required/>
                        <div id="remember" className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/>
                                Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
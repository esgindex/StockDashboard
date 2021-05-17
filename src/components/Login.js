import React from 'react'
import { Panel, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import {
    Redirect
} from 'react-router-dom'
import {FakeAuth} from './App'

  

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "", 
            password: "", 
            error: "",
            redirectToReferrer: false 
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event, logger) {
        event.preventDefault();
        try {
          const { history } = this.props;
          if (this.state.email === "Test" && this.state.password === "Test") {
            FakeAuth.authenticate(() => {
                if ( this.refs.LoginFormRef ){
                    this.setState(() => ({
                        redirectToReferrer: true
                    }))
                }
            })
            history.push("/");
          }
          else{
                if ( this.refs.LoginFormRef ){
                    this.setState({
                        error: "Username or Password is not correct"
                    })
                }
          }
        } catch (e) {
          console.log(e);
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        if ( this.refs.LoginFormRef ){
            this.setState({
            [name]: value
            });
        }
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
  
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }
  
        return (
            <div className="form-login_wrapper" ref="LoginFormRef">
              <Panel>
                <Form horizontal className="LoginForm" id="loginForm">
                  <FormGroup controlId="formEmail">
                    <FormControl
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="formPassword">
                    <FormControl
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="formSubmit">
                    <Button
                      bsStyle="primary"
                      type="submit"
                      className="btn-login"
                      onClick={this.handleFormSubmit.bind(this)}
                    >
                      Login
                    </Button>
                  </FormGroup>

                  <FormGroup>
                      <span id="error_message" className="msg-error">{this.state.error}</span>
                  </FormGroup>
                </Form>
              </Panel>
            </div>
        );
    }
}

export default Login
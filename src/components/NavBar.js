import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import {FakeAuth} from './App';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            authenticated: FakeAuth.isAuthenticated
        };
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(event) {
        FakeAuth.signout(() => {
            if ( this.refs.NavbarRef ){
                this.setState({
                    authenticated: false,
                })
            }
        })
    }

    render() {
        const { from } = { from: { pathname: '/login' } }
        const { authenticated } = this.state
  
        if (authenticated === false) {
            return <Redirect to={from} />
        }

        return (
        <Navbar ref="NavbarRef">
            <Navbar.Header>
            <Navbar.Brand>
                <a href="/">ESGLoader</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem 
                    eventKey={1} 
                    onClick={this.handleLogOut.bind(this)}
                >
                    Log out
                </NavItem>
            </Nav>
        </Navbar>
        );
    }
}

export default NavBar;
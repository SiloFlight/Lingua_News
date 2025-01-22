import React from "react";

import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import {colors} from "../consts.js";

function GetNavbar(){
    return (<Navbar style={{backgroundColor:colors.c5}}>
        <Container>
            <Navbar.Brand href="/" className="text-center fs-4">Lingua<br/>News</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="fs-5">
                    <Nav.Link href="/" className="px-3">Home</Nav.Link>
                    {/*<NavDropdown className="px-1" title="Languages">
                        <NavDropdown.Item>Spanish</NavDropdown.Item>
    </NavDropdown>*/}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)
}

export default GetNavbar;
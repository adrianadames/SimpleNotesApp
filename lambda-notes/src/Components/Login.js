import React, { Component } from 'react';
import axios from 'axios';
import host from '../host';
import styled from 'styled-components';

const StyledInput = styled.input`
    background-color:#D8D8D8
`

const StyledSpan = styled.span`
    font-weight: bold;
`;

const StyledDemoCredentialsDiv = styled.div`
    border: 1px solid black;
`;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '', 
            errorMessage:null, 
            demoCredentials: false
        };
    };

    toggleDemoCredentials = e => {
        e.preventDefault();
        this.setState((prevState => ({
            demoCredentials:!prevState.demoCredentials
          })))
    }

    inputChangeHandler = e => {
        e.preventDefault();
        const {name, value} = e.target;
        // console.log('name: ', name, 'value: ', value);
        this.setState({[name]: value});
    }

    loginSubmitHandler = e => {
        e.preventDefault();
        let loginData = {
            'username': this.state.username,
            'password': this.state.password
        };
        // console.log(`${host}/api/login`)
        axios
            .post(`${host}/api/login`, loginData) 
            .then(res=> {
                // console.log('res: ', res);
                const lambdaNotesToken = res.data.token;
                const lambdaNotesUserId = res.data.userId;
                localStorage.setItem('lambdaNotesToken', lambdaNotesToken);
                localStorage.setItem('lambdaNotesUserId', lambdaNotesUserId);
                this.props.fetchNoteEntries();
            })
            .catch(err => {
                // console.log('err: ', err)
                let errorMessage = err;
                 if (errorMessage.message === "Request failed with status code 401") {
                    this.setState({errorMessage:'Invalid Credentials'})
                 } else {
                    this.setState({errorMessage:errorMessage.message})
                 }
            })
    }
    
    render() {
        return (
            <div>
                <form onSubmit = {this.loginSubmitHandler}>
                    <div>
                        <StyledInput
                            type = 'text'
                            name = 'username'
                            placeholder="username"
                            value = {this.state.username} 
                            onChange = {this.inputChangeHandler}
                        /> 
                    </div>
                    <div>
                        <StyledInput
                            type = 'password'
                            name = 'password'
                            placeholder="password"
                            value = {this.state.password} 
                            onChange = {this.inputChangeHandler}
                        /> 
                    </div>
                    <div>
                        <button type = 'submit'>Login</button>
                    </div>
                    <br/>
                    {this.state.errorMessage 
                        ?
                        <div style = {{color:'red'}}>{this.state.errorMessage}</div>
                        :
                        null
                    }
                    <br/>
                    <div >
                        Don't have an account? <br/><br/>
                        <StyledSpan onClick = {this.props.toggleRegisterAndLoginFormVisibility}>Register </StyledSpan> 
                        or click <StyledSpan onClick = {this.toggleDemoCredentials}>here</StyledSpan> for demo credentials. 
                    </div>
                    <br/>
                    {this.state.demoCredentials
                        ?
                        <StyledDemoCredentialsDiv>
                            <span>Demo Credentials</span>
                            <br/>
                            <br/>
                            username: adrian123
                            password: adames123
                        </StyledDemoCredentialsDiv>
                        :
                        null
                    }
                </form>
            </div>
        )
    }
}

export default Login
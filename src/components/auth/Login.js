import React, {Component} from "react"

import {
    Alert,
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Login extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        msg: ''
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if(error!== prevProps.error){
            // check for register error
            if(error.id==='LOGIN_FAIL')
            this.setState({
                msg: error.msg.msg
            })
            else
                this.setState({
                    msg: null
                })  
            
        }
        // If auth redirect to loglist
        if(isAuthenticated){
            this.props.clearErrors()
            this.props.history.push('/loglist')
        }
    }

    handleChange = (e) => {
        this.setState({
            // dont need to write multiple inputs
            // name is name attr of input
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email,password} = this.state

        // user obj

        const newUser = {
            email,
            password
        }

        this.props.login(newUser)
        
    }

    render(){


    return (
        
        <div>
        <Container>
        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
            <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="email" 
             onChange={this.handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" placeholder="password" 
             onChange={this.handleChange}
        />
      </FormGroup>
      <Button
                        color='dark'
                        style={{marginTop:'2rem'}}
                        block
                        >Login</Button>
            </Form>
            </Container>
        </div>
        
    )
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    login: PropTypes.func.isRequired
})

export default connect(
    mapStateToProps,
    {login,clearErrors}
)(Login)

import React, {Component} from "react"

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { connect } from 'react-redux'

import signupimg  from '../../assets/undraw_enter_uhqk.svg'

class Signup extends Component {

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
            if(error.id==='REGISTER_FAIL')
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
            this.props.history.push('/loglist')
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    

    onSubmit = (e) => {
        e.preventDefault();

        const {name,email,password} = this.state

        // user obj

        const newUser = {
            name,
            email,
            password
        }

        this.props.register(newUser)

        
    }

    render(){


    return (
        <div className="lognsignup container1">
        <Container className="loginsignupimg">
        <img src={signupimg}/>
        </Container>
        <Container className="container1 mt-5">
        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
            <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="name" 
            onChange={this.handleChange}
        />
      </FormGroup>
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
                        >SignUp</Button>
            </Form>
            </Container>
        </div>
    )
    }
}

Signup.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    {register}
)(Signup)

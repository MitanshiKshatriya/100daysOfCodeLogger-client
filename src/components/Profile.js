import React from 'react'
import { 
    Button,
    Container,
    Progress
} from 'reactstrap'
import {MdAccountCircle} from 'react-icons/md'
import { connect } from 'react-redux'
import { PromiseProvider } from 'mongoose'
import { isLogin } from '../actions/authActions'

class Profile extends React.Component {
    render(){
        let user={}
        if(this.props.user===null){
            user.name=''
            user.days_completed=0
        }
        else user = this.props.user
    return (
        <>
            <Container>
            <div className="mt-5 text-center container2">
            <MdAccountCircle size="4.5em"/>
           <h1>Welcome {user.name}</h1> 
           <p className="container3 mt-5 mb-5">
           <div className="text-center">{user.days_completed}/100 Days</div>
           <Progress value={user.days_completed} className="mt-2" />
           </p>
            </div>
            <div className="container3">
                <div className="goals-container">
                    <div className="goals">
        <p><input type="checkbox"/>{" "}Learn GoLang</p>
        <p><input type="checkbox"/>{" "}Learn React</p>
        <p><input type="checkbox"/>{" "}Work on golang project</p>
                    </div>
                    <div className="goals">
                    <p><input type="checkbox"/>{" "}Learn GoLang</p>
        <p><input type="checkbox"/>{" "}Learn React</p>
        <p><input type="checkbox"/>{" "}Work on golang project</p>
                    </div>
                </div>
            </div>
            <div className="container3 btn-container mt-5">
                <Button>Add goals</Button>
                {" "}
                <Button>Edit Status</Button>
            </div>
            </Container>
        </>
    )
    }
}


  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  })
  
  export default connect(
    mapStateToProps,
    {isLogin}
  )(Profile)

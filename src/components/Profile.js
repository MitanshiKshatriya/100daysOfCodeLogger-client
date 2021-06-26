import React from 'react'
import { 
    // Button,
    Container,
    Progress
} from 'reactstrap'
import {MdAccountCircle, } from 'react-icons/md'
import { connect } from 'react-redux'
import Goals from './Goals1'
import { loadGoals } from '../actions/goalActions'

class Profile extends React.Component {

    componentDidMount(){
        this.props.loadGoals()
    }
    
    render(){
        let user={}
        if(this.props.user===null){
            user.name=''
            user.days_completed=0
        }
        else user = this.props.user
        if(this.props.isLoading===true)
        return <div>Loading...</div>
        else
    return (
        <>
            <Container>
            <div className="mt-5 text-center container2">
            <MdAccountCircle size="4.5em"/>
           {/* <h1>Welcome {user.name}</h1>  */}
           <h1>Welcome {user.name.charAt(0).toUpperCase()+user.name.slice(1)}</h1> 
           <div className="container3 mt-5 mb-5">
           <div className="text-center">{user.days_completed}/100 Days</div>
           <Progress value={user.days_completed} className="mt-2" />
           </div>
            </div>
            <Goals goals={this.props.goals} />
            </Container>
        </>
    )
    }
}


  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    goals: state.goal.goals,
    isLoading: state.goal.isLoading
  })
  
  export default connect(
    mapStateToProps,
    {loadGoals}
  )(Profile)

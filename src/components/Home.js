import React from 'react'
import { 
    Container,
    Button 
} from 'reactstrap'
import { Link } from 'react-router-dom'
import devimage from '../assets/developer_activity.svg'
import { connect, useSelector } from 'react-redux'
const Home = () => {
    const isAuthenticated = useSelector(state=> state.auth.isAuthenticated)
    return (
        <div>
        <Container className="home mt-5">
        <div className="home-title mt-2">
        <h1>Log your #100daysofcode progress</h1>
        </div>
        <div className="home-image">
        <img src={devimage}/>
        </div>
        </Container>
        <Container className="text-center" style={{fontize:"1.5em"}}>
            {
                isAuthenticated===true
                ?
                <h6><Link to="/loglist">Log Your Progress</Link></h6>
                :
                <h6><Link to="/signup">Sign Up</Link></h6>
            }
        </Container>
        </div>
    )
}

export default connect(
    null,
    {  }
  )(Home);

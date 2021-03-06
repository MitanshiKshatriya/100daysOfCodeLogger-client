import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types' 
import store from '../store'
import classnames from 'classnames';

import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Card, 
  Button, 
  CardTitle, 
  CardText, 
  Row, 
  Col 
} from 'reactstrap';
import { loadGoals } from '../actions/goalActions';


const padarray = (array) => {
  let arr = []
  if(array.length>=6)
  return array
  else{
    for(let i=0;i<6-array.length;i++){
      array.push({
        _id:'',
        goal:'',
        completed:false
      })
    }
    return array
  }

}


class Goals extends Component {
  state = {
    totalGoals: 6,
    diff: 0,
    activeTab: '1',
    goal0: '',
    goal1: '',
    goal2: '',
    goal3: '',
    goal4: '',
    goal5: '',
    check0: '',
    check1: '',
    check2: '',
    check3: '',
    check4: '',
    check5: '',
    id0: '',
    id1:'',
    id2:'',
    id3:'',
    id4:'',
    id5:''
  }

  

  setActiveTab = (tab) => {
    this.setState({
      activeTab: tab
    })
  }

  toggle = tab => {
    if(this.state.activeTab !== tab) 
    this.setState({
      activeTab: tab
    })
  }

  componentDidMount(){
    this.props.loadGoals()
    // this.props.goals.map(({_id,goal,completed},i)=>{
    //   this.setState({
    //     ["goal"+i]:goal,
    //     ["check"+i]:completed,
    //     ["id"+i]:_id,
    //   })
    // })
  }

  handleChange = (e) => {
    this.setState({
        // dont need to write multiple inputs
        // name is name attr of input
        [e.target.name]: e.target.value
    })
  }

  handleCheckboxChange = (e) => {
    this.setState({
        // dont need to write multiple inputs
        // name is name attr of input
        [e.target.name]: e.target.checked
    })
  }

  handleSubmit = (e) => {
    console.log(this.state)
  }

  render() {
    let array = padarray(this.props.goals)
    return (
      <>
        <div className="container3">
        <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            Goals
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Edit Goals
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <div className="goals-container">
        {
          this.props.goals.length>0 ?
          this.props.goals.map(({_id,goal,completed})=>(
            <div className="goals">
                    <p><input type="checkbox" checked={completed}/>{" "}{goal}</p>
                    </div>
          ))
          :
          <div></div>
        }
                    
                </div>
        </TabPane>
        <TabPane tabId="2">
        <div className="goals-edit-container">
        {
          array.length>0 ?
          array.map(({_id,goal,completed},index)=>(
            <div className="goals">
                    <p>
                    <input type="checkbox" 
                    checked={this.state["check"+index]}
                    onClick={e=>this.handleCheckboxChange}
                    defaultValue={completed}
                    name={"check"+index}
                    />{" "}
                    <input type="text" 
                    name={"goals"+index} 
                    defaultValue={goal}
                    value={this.state["goals"+(index)]}
                    onChange={this.handleChange}
                    />
                    </p>
                    </div>
          ))
          :
          <div></div>
        }
        </div>
        <div className="edit-goals-btn mt-2">
          <Button onClick={()=>this.handleSubmit}>Update</Button>
        </div>
        </TabPane>
      </TabContent>

        </div>
      </>
    )
  }
}

Goals.propTypes = {
  goals: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  goals: state.goal.goals,
  isLoading: state.goal.isLoading
})


export default connect(
  mapStateToProps, {loadGoals})
  (Goals)



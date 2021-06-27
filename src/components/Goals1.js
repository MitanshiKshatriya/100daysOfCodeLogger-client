import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types' 
import uuid from 'react-uuid'
import classnames from 'classnames';
import { MdCheck, MdClose } from 'react-icons/md'
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Button, 
} from 'reactstrap';
import { loadGoals, postGoals } from '../actions/goalActions';

const mdicons = (bool) => {
if(bool)
return <MdCheck size="1.3em"/>
else
return <MdClose size="1.3em"/>
}


const padarray = (array) => {
  if(array===null)
  array=[]
  if(array.length>=6)
  return array
  else{
    let n = array.length
    for(let i=0;i<6-n;i++){
      array.push({
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

  

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleCheckboxChange = (e) => {
    this.setState({
        [e.target.name]: e.target.checked
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let goals = []
    for(var i=0;i<6;i++){
      if(this.state['goal'+i]!==''){
        goals.push({
          _id: this.state['id'+i]===undefined ? uuid() : this.state['id'+i],
          goal: this.state['goal'+i],
          completed: this.state['check'+i]===true ? true : false

        })
      }
    }
    this.props.postGoals(goals)
    window.location.reload()
  }

  componentDidMount(){
    if(this.props.goals)
    this.props.goals.map(({_id,goal,completed},i)=>{
      this.setState({
        ["goal"+i]:goal,
        ["check"+i]:completed,
        ["id"+i]:_id,
      })
    })
    // for(let i=this.props.goals.length-1;i<=0;i--){
    //   this.setState({
    //     ["id"+i]:uuid(),
    //   })
    // }
  }

  render() {
    let array = padarray(this.props.goals)
    if(this.props.isLoading===true) 
    return <div></div>
    else
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
          this.props.goals && this.props.goals.length>0 ?
          this.props.goals.map(({_id,goal,completed},index)=>(
            <div className="goals" key={uuid()}
            style={{visibility:goal.length>0? "visible" : "hidden"}}
            >
                    <div>
                    {/* <input type="checkbox" checked={completed}/> */}
                    {mdicons(completed)}
                    {" "}{goal}</div>
                    </div>
          ))
          :
          <div>No goals added. Switch tab to add.</div>
        }          
                </div>
        </TabPane>
        <TabPane tabId="2">
        <div className="goals-edit-container">
        {
          array.length>0 ?
          array.map(({_id,goal,completed},index)=>(
            <div className="goals" key={index}>
                    <div>
                    <input type="checkbox" 
                    checked={this.state["check"+index]}
                    onChange={this.handleCheckboxChange}
                    // defaultValue={completed}
                    name={"check"+index}
                    />{" "}
                    <input type="text" 
                    name={"goal"+index} 
                    // defaultValue={goal}
                    value={this.state["goal"+(index)]}
                    onChange={this.handleChange}
                    />
                    </div>
                    </div>
          ))
          :
          <div></div>
        }
        </div>
        <div className="edit-goals-btn mt-2">
          <Button onClick={this.handleSubmit}>Update</Button>
        </div>
        </TabPane>
      </TabContent>

        </div>
      </>
    )
  }
}

Goals.propTypes = {
  // goals: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
//   goals: state.goal.goals,
  isLoading: state.goal.isLoading
})


export default connect(
  mapStateToProps, {loadGoals,postGoals})
  (Goals)



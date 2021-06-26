import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Container, Button, ListGroup,ListGroupItem } from 'reactstrap'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'
import LogModal from '../LogModal';

import {connect} from 'react-redux';
import { getItems, deleteItem, updateItem } from '../../actions/itemActions'
import PropTypes from 'prop-types' 
import Note from './Note';
import Search from '../Search';


class LogList extends Component {

    state = {
        modal: false,
        update_id: '',
        update_desc: '',
        search: ''

    }

    componentDidMount(){        
        this.props.getItems();
        
    }
    // _id coming from mongo
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        window.location.reload()
    }

    onUpdateClick = (_id,desc) => {
        this.setState({
            modal: true,
            update_id: _id,
            update_desc: desc
        })
        
    }

    /*
    * Update functions 
    */
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            // dont need to write multiple inputs
            // name is name attr of input
            // [e.target.name]: e.target.value
            update_desc: e.target.value
        })
    }

    onSubmitUpdate = (e) => {
        e.preventDefault();

        const newItem = {
            _id: this.state.update_id,
            desc: this.state.update_desc
        }
        // console.log(newItem)
        // add item via addItem action
        this.props.updateItem(newItem);

        //close modal
        this.toggle();
        window.location.reload()
    }

   /*
   * Update functions
    */

   /*
   * Search Function
    */
   handleSearchLog = (text) => {
    this.setState({
        search:text
    })
   }
   /*
   * Search Function
    */

    render() {
        // this.props.item.items
        // const {items} = this.props.item
        // filtering items
        const items = this.props.item.items.filter((i)=>
            i.desc.toLowerCase().includes(this.state.search)
        )
        if(this.props.isLoading)
        return <div>Loading...</div>
        else
        return (
            <>
            <Search handleSearchLog={this.handleSearchLog}/>
            <div className="container2">
                <LogModal isUpdate={this.state.isUpdate} 
                />
            </div>
            <div className="container1">
            <div className='notes-list'>
            {items.map(({_id,desc,day,date})=>(
                <Note _id={_id} desc={desc} day={day} date={date}
                    onDeleteClick={this.onDeleteClick.bind(this,_id)}
                    onUpdateClick={this.onUpdateClick.bind(this,_id,desc)}
                />
            ))}
            </div>
            </div>
            <Container>
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                <ModalHeader
                toggle={this.toggle}
                >
                Update a Log
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmitUpdate}>
                    <FormGroup>
                        {/* <Label for="log">
                            Update Log
                        </Label>
                        <Input
                            type="text"
                            name="desc"
                            id="item"
                            placeholder="log your progress"
                            value={this.state.update_desc}
                            onChange={this.onChange}
                        /> */}
                        <textarea
                            type="text"
                            name="desc"
                            id="item"
                            placeholder="Update your log"
                            rows="6"
                            value={this.state.update_desc}
                            onChange={this.onChange}
                        >
                        </textarea>
                        <Button
                        color='dark'
                        style={{marginTop:'2rem'}}
                        block
                        >Update Log</Button>
                    </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>

            </Container>
            </>
        )
    }
}

LogList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isLoading: state.auth.isLoading
})


export default connect(
    mapStateToProps, {getItems,deleteItem,updateItem})
    (LogList)

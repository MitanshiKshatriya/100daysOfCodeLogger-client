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
    Input
} from 'reactstrap'
import ItemModal from './ItemModal';

import {connect} from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions'
import PropTypes from 'prop-types' 

class LogList extends Component {
    // state = {
    //     items:[
    //         {id:uuid(),desc:"Helo"},
    //         {id:uuid(),desc:"Helo"},
    //         {id:uuid(),desc:"Helo"},
    //         {id:uuid(),desc:"Helo"},
    //     ]
    // }

    state = {
        modal: false,
        update_id: '',
        update_desc: ''

    }

    componentDidMount(){
        this.props.getItems();
        
    }
    // _id coming from mongo
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
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
    }

   /*
   * Update functions
    */

    render() {
        // this.props.item.items
        const {items} = this.props.item
        return (
            <>
            <Container>
                {/* {this.renderModal()} */}
                <ItemModal isUpdate={this.state.isUpdate}/>
            </Container>
            <Container>
                {/* <Button
                color = "dark"
                style = {{marginBottom:"2rem"}}
                onClick={()=> {
                    const desc = prompt('Enter Item');
                    if(desc){
                        this.setState({
                            // items: [...this.state.items,{id:uuid(),desc}]
                        })
                    }
                }}
                >Add Item</Button> */}

                <ListGroup>
                    <TransitionGroup className="log-list">
                       {
                           items.map(({_id,desc})=>(
                               <CSSTransition key={_id} timeout={500} classNames="fade">
                                
                                <ListGroupItem>
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this,_id)}
                                >
                                    &times;
                                </Button>
                                <Button
                                className="edit-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onUpdateClick.bind(this,_id,desc)}
                                >
                                    Edit
                                </Button>
                                    {desc}
                                </ListGroupItem>

                               </CSSTransition>
                           ))
                       } 
                    </TransitionGroup>
                </ListGroup>
            </Container>
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
                        <Label for="log">
                            Update Log
                        </Label>
                        <Input
                            type="text"
                            name="desc"
                            id="item"
                            placeholder="log your progress"
                            value={this.state.update_desc}
                            onChange={this.onChange}
                        />
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
    item: state.item
})


export default connect(
    mapStateToProps, {getItems,deleteItem,updateItem})
    (LogList)

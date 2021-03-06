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
import LogModal from './LogModal';

import {connect} from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions'
import PropTypes from 'prop-types' 


class LogGrid extends Component {
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
    }

   /*
   * Update functions
    */

    render() {
        // this.props.item.items
        const {items} = this.props.item
        if(this.props.isLoading)
        return <div>Loading...</div>
        else
        return (
            <>
            <Container>
                {/* {this.renderModal()} */}
                <LogModal isUpdate={this.state.isUpdate} 
                // days_completed={this.props.days_completed}

                />
            </Container>
            <Container>
                <Row>
                <Col sm="4">
                    
                       {
                           items.map(({_id,desc,day,date})=>(
                               
                                
                                
                                <Card>
                                <CardBody>
                                <CardTitle>Day {day}</CardTitle>
                                
                                    <CardText>{desc}</CardText>
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
                                </CardBody>
                                </Card>
                                


                           ))
                       } 
                    
                    </Col>
                </Row>
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

LogGrid.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isLoading: state.auth.isLoading
})


export default connect(
    mapStateToProps, {getItems,deleteItem,updateItem})
    (LogGrid)

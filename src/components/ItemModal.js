import React, {Component} from "react"

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import uuid from 'react-uuid'

class ItemModal extends Component {

    state = {
        modal: false,
        desc: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            // dont need to write multiple inputs
            // name is name attr of input
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: uuid(),
            desc: this.state.desc
        }
        // add item via addItem action
        this.props.addItem(newItem);

        //close modal
        this.toggle();
    }



    render(){
        return (
            <div>
                <Button
                color = "dark"
                style = {{marginBottom:'2rem'}}
                onClick = {this.toggle}
                >
                Add Item Modal
                </Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                <ModalHeader
                toggle={this.toggle}
                >
                Add a Log
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="log">
                            Add Log
                        </Label>
                        <Input
                            type="text"
                            name="desc"
                            id="item"
                            placeholder="log your progress"
                            onChange={this.onChange}
                        />
                        <Button
                        color='dark'
                        style={{marginTop:'2rem'}}
                        block
                        >Add Log</Button>
                    </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state =>  ({
    item: state.item
})

export default connect(mapStateToProps,{addItem})(ItemModal);
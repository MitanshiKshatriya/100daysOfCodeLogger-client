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

const getStringDate = () => {
    let d  = new Date()
    // 2021-06-23
    let month = d.getMonth()+1>10 ? `${d.getMonth()+1}` : `0${d.getMonth()+1}`
    return `${d.getFullYear()}-${month}-${d.getDate()}`
}

class ItemModal extends Component {

    state = {
        modal: this.props.isUpdate,
        isUpdate: this.props.isUpdate,
        _id: '',
        desc: '',
        date: getStringDate(),
        day: 0
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
        // 2021-06-23
        const newItem = {
            // id: uuid(),
            desc: this.state.desc,
            day: this.state.day,
            date: this.state.date
        }
        // add item via addItem action
        this.props.addItem(newItem);

        //close modal
        this.toggle();

        window.location.reload()
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
                        <Input
                            type="date"
                            name="date"
                            id="date"
                            defaultValue={this.state.date}
                            onChange={this.onChange}
                        />
                        <Input
                            type="number"
                            name="day"
                            id="day"
                            placeholder={`Log for day ${this.props.days_completed+1}`}
                            // value={this.state.day}
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
    item: state.item,
    days_completed: state.auth.user !== null ? state.auth.user.days_completed : 0
})

export default connect(mapStateToProps,{addItem})(ItemModal);
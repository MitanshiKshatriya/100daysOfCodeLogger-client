import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Container, Button, ListGroup,ListGroupItem } from 'reactstrap'
import ItemModal from './ItemModal';

import {connect} from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'
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

    componentDidMount(){
        this.props.getItems();
    }
    // _id coming from mongo
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        // this.props.item.items
        const {items} = this.props.item
        return (
            <>
            <Container>
                <ItemModal/>
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
                           items.map(({id,desc})=>(
                               <CSSTransition key={id} timeout={500} classNames="fade">
                                
                                <ListGroupItem>
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this,id)}
                                >
                                    &times;
                                </Button>
                                    {desc}
                                </ListGroupItem>

                               </CSSTransition>
                           ))
                       } 
                    </TransitionGroup>
                </ListGroup>
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
    mapStateToProps, {getItems,deleteItem})
    (LogList)

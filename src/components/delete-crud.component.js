import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DeleteCrud extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/crud/delete/'+this.props.match.params.id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
            
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
            <h3>Are you Sure you want to Delete This....!!!!</h3>
            <input type="button" onClick={this.delete} className="btn btn-danger" value="Confirm"  /> 

        </div>
        )
    }
}

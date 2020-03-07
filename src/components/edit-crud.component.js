import React, { Component } from 'react';
import axios from 'axios';

export default class EditCrud extends Component {

    constructor(props) {
        super(props);

        this.onChangeCrudDescription = this.onChangeCrudDescription.bind(this);
        this.onChangeCrudResponsible = this.onChangeCrudResponsible.bind(this);
        this.onChangeCrudPriority = this.onChangeCrudPriority.bind(this);
        this.onChangeCrudCompleted = this.onChangeCrudCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.delete = this.delete.bind(this);

        this.state = {
            crud_description: '',
            crud_responsible: '',
            crud_priority: '',
            crud_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/crud/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    crud_description: response.data.crud_description,
                    crud_responsible: response.data.crud_responsible,
                    crud_priority: response.data.crud_priority,
                    crud_completed: response.data.crud_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeCrudDescription(e) {
        this.setState({
            crud_description: e.target.value
        });
    }

    onChangeCrudResponsible(e) {
        this.setState({
            crud_responsible: e.target.value
        });
    }

    onChangeCrudPriority(e) {
        this.setState({
            crud_priority: e.target.value
        });
    }

    onChangeCrudCompleted(e) {
        this.setState({
            crud_completed: !this.state.crud_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            crud_description: this.state.crud_description,
            crud_responsible: this.state.crud_responsible,
            crud_priority: this.state.crud_priority,
            crud_completed: this.state.crud_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/crud/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
        
        this.props.history.push('/');
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
                <h3 align="center">Update Crud</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.crud_description}
                                onChange={this.onChangeCrudDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.crud_responsible}
                                onChange={this.onChangeCrudResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.crud_priority==='Low'} 
                                    onChange={this.onChangeCrudPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.crud_priority==='Medium'} 
                                    onChange={this.onChangeCrudPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.crud_priority==='High'} 
                                    onChange={this.onChangeCrudPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeCrudCompleted}
                                checked={this.state.crud_completed}
                                value={this.state.crud_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Crud" className="btn btn-primary" />
                    </div>
                    <input type="button" onClick={this.delete} className="btn btn-danger" value="Delete"  />  
                    {/* <button onClick={this.delete} className="btn btn-danger">Delete</button> */}
        
                </form>
            </div>
        )
    }
}
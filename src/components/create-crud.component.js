import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCrud extends Component {
    constructor(props) {
        super(props);

        this.onChangeCrudDescription = this.onChangeCrudDescription.bind(this);
        this.onChangeCrudResponsible = this.onChangeCrudResponsible.bind(this);
        this.onChangeCrudPriority = this.onChangeCrudPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            crud_description: '',
            crud_responsible: '',
            crud_priority: '',
            crud_completed: false
        }
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
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`CRUD Description: ${this.state.crud_description}`);
        console.log(`CRUD Responsible: ${this.state.crud_responsible}`);
        console.log(`CRUD Priority: ${this.state.crud_priority}`);
        
        const newCrud = {
            crud_description: this.state.crud_description,
            crud_responsible: this.state.crud_responsible,
            crud_priority: this.state.crud_priority,
            crud_completed: this.state.crud_completed
        };

        axios.post('http://localhost:4000/crud/add', newCrud)
            .then(res => console.log(res.data));

            this.props.history.push('/');
        this.setState({
            crud_description: '',
            crud_responsible: '',
            crud_priority: '',
            crud_completed: false
        })
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New</h3>
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

                    <div className="form-group">
                        <input type="submit" value="Create Crud" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
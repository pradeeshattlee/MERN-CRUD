import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Crud = props => (
    <tr>
        <td className={props.crud.crud_completed ? 'completed' : ''}>{props.crud.crud_description}</td>
        <td className={props.crud.crud_completed ? 'completed' : ''}>{props.crud.crud_responsible}</td>
        <td className={props.crud.crud_completed ? 'completed' : ''}>{props.crud.crud_priority}</td>
        <td>
            <Link to={"/edit/"+props.crud._id} className="btn btn-primary" >Edit</Link>
        </td>
        <td>
        <Link to={"/delete/"+props.crud._id} className="btn btn-danger" >Delete</Link>
        {/* <td><input type="button" onClick={this.delete} className="btn btn-danger" value="Delete"  /></td> */}
        </td>
    </tr>
)

export default class CrudList extends Component {
    constructor(props) {
        super(props);
        this.state = {crud: []};
        // this.delete = this.delete.bind(this);
    }
    // delete(e) {
    //     e.preventDefault();
    //     axios.post('http://localhost:4000/crud/delete/'+this.props.match.params.id)
    //         .then(console.log('Deleted'))
    //         .catch(err => console.log(err))
            
    //     this.props.history.push('/');
    // }
    componentDidMount() {
        axios.get('http://localhost:4000/crud/')
            .then(response => {
                this.setState({ crud: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    crudList() {
        return this.state.crud.map(function(currentCrud, i){
            return <Crud crud={currentCrud} key={i} />;
        })
    }
    render() {
        return (
            <div>
            <h3>CRUD List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.crudList() }
                    {/* <td><input type="button" onClick={this.delete} className="btn btn-danger" value="Delete"  /></td> */}
                </tbody>
            </table>
        </div>
        )
    }
}

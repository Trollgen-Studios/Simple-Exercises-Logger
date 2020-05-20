import React, { Component } from 'react';
import axios from 'axios';

/**
 * Handle creation of user and posting it to the backend
 */
export default class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
    };

    // Post a create user request to the backend DB
    axios.post('http://localhost:5000/users/add', newUser)
      .then(res => console.log(res.data));
    
    // Reset the state to blank so once a user has been created, allow more users to be created
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// Just a simple UI element that holds data
// No lifecycle, no state methods
// Just takes the argument of "props" (the data passed onto it)
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td> {/* omit the uneeded parts through substring */}
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

/**
 * Returns a list of exercises based on the Exercise class above
 */
export default class ExercisesList extends Component {
  
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] }
  }

  componentDidMount() {
    // Get the exercises data
    axios.get('http://localhost:5000/exercises')
    .then(res => {
      this.setState({
        // this time, get the full data with all the fields of the exercises
        exercises: res.data 
      })
    })
    .catch(err => console.log(err));
  }

  /**
   * Post a delete request to the backend
   * @param {string} id 
   */
  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(res => console.log(res.data));

    // React automatically updates the page when the state is changed
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  // Map each element in the array to a Exercise object
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
import React, { Component } from 'react';

import axios from 'axios';

class Home extends Component {
  state = {
    course: '',
    courses: []
  };

  componentDidMount() {
    this.courseLoad();
  }

  courseLoad = () => {
    axios
    .get("http://localhost:3000/api/courses")
    .then(response => {
      this.setState({ ...this.state, courses: response.data })
    })
    .catch(error => {
      console.log(error)
    });
  }

  courseChange = (e) => {
    this.setState({ ...this.state, course: e.target.value });
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/courses', { name: this.state.course })
      .then((response) => {
        this.courseLoad();
      })
      .catch((error => {
        console.log(error);
      }))
  }

  courseDelete = (courseId) => {
    axios
      .delete(`http://localhost:3000/api/courses/${courseId}`)
      .then((response) => {
        this.courseLoad();
      })
      .catch((error => {
        console.log(error);
      }))
  }

  render() {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="course" onChange={this.courseChange}></input>
          <button type="submit">Enviar</button>
        </form>
        <ul>
          { this.state.courses.map((course) => {
            return (<li key={course._id} onClick={() => this.courseDelete(course._id)}>{course.name}</li>)
          }) }
        </ul>
      </React.Fragment>
    )
  }
}

export default Home;
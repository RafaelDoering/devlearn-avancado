import React, { Component } from 'react';
import axios from 'axios';

import './Home.css'

class Home extends Component {
  state = {
    course: '',
    courses: []
  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses = () => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => {
        this.setState({ ...this.state, courses: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  createCourse = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/courses', { name: this.state.course })
      .then((response) => {
        this.getCourses();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteCourse = (courseId) => {
    axios
      .delete(`http://localhost:5000/api/courses/${courseId}`)
      .then((response) => {
        let newCourses = [];
        for (let course of this.state.courses) {
          if (course._id !== courseId) {
            newCourses.push(course);
          }
        }
        this.setState({ ...this.state, courses: newCourses })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleCourseInput = (e) => {
    this.setState({ ...this.state, course: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.createCourse}>
          <input type="text" name="course" onKeyUp={this.handleCourseInput}></input>
          <button type="submit">Enviar</button>
        </form>
        <ul>
          {
            this.state.courses.map((course) => {
              return (
                <li key={course._id} onClick={() => this.deleteCourse(course._id)}>{course.name}</li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

export default Home;
import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from "react-router-dom";
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      newSmurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
    .get('http://localhost:3333/smurfs')
    .then(response => {
      this.setState({ smurfs: response.data })
    })
    .catch(error => {
      console.log(error);
    })
  }

  addSmurf = event => {
    event.preventDefault();
    this.state.newSmurf.name &&
    this.state.newSmurf.age &&
    this.state.newSmurf.height &&
    axios
    .post('http://localhost:3333/smurfs', this.state.newSmurf)
    .then(response => {
      this.setState({
        smurfs: response.data,
        newSmurf: {
          name: '',
          age: '',
          height: ''
        }
      });
    })
    .catch(error => {
      console.log(error);
    }) 
  }

  handleInputChange = e => {
    e.persist();
    this.setState(prevState => ({ 
      newSmurf: {
        ...prevState.newSmurf,
        [e.target.name]: e.target.value
      }
    }));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <div className="nav-container">
            <NavLink className="nav-link" activeClassName="active" to="/"><div>Home</div></NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/add"><div>Add Smurf</div></NavLink>
          </div>
          
        </nav>

        <Route
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} /> }
        />
        <Route
          exact
          path="/add"
          render={props => (
            <SmurfForm 
              newSmurf={this.state.newSmurf} 
              add={this.addSmurf} 
              change={this.handleInputChange} 
            />
          )}
        />
      </div>
    );
  }
}

export default App;

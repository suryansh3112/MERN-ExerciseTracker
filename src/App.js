import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import Navbar from './components/navbar';
import ExerciseList from './components/exerciseList';
import CreateExercise from './components/createExercise';
import CreateUser from './components/createUser';
import EditExercise from './components/editExercise'


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/createExercise" component={CreateExercise} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/edit/:id" component={EditExercise} />
      </div>
    </Router>
    
  );
}

export default App;


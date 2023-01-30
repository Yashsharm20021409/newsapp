// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  // render is a life cycle method(jb react ek component ko load krti h to kuch series of method run hote h) 
  // jb render mthod run hote h to screen pe html ko(phle jsx ko html me compile krna then render krna) render krna
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
      </div>
    )
  }
}


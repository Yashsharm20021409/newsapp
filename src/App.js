// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {
  // to use proptypes in class we have to used static keyword
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  state = {
    progress:0
  }

  setProgress = (progress) =>{
    this.setState({
      progress:progress
    })
  }


  // render is a life cycle method(jb react ek component ko load krti h to kuch series of method run hote h) 
  // jb render mthod run hote h to screen pe html ko(phle jsx ko html me compile krna then render krna) render krna
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={2.5}
            color='#f11946'
            progress={this.state.progress}
            
          />
          {/* <News pageSize='8' category='science' country='in' /> */}
          <Routes>
            {/* jb hm kise bhi nevigation pe click kre h to data remount ni ho rha h due to this we have to give it a unique key */}
            <Route exact path='/' element={<News setProgress={this.setProgress} key='genral' pageSize='8' category='general' country='in' />} ></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' pageSize='8' category='business' country='in' />}> </Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertaiment' pageSize='8' category='entertainment' country='in' />}></Route>
            <Route exact path='/general' element={<News setProgress={this.setProgress} key='genral2' pageSize='8' category='general' country='in' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' pageSize='8' category='health' country='in' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' pageSize='8' category='science' country='in' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize='8' category='sports' country='in' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize='8' category='technology' country='in' />}></Route>

          </Routes>
        </Router>
      </div>
    )
  }
}


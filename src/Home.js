import React, { Component } from 'react';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';

class Home extends Component {
  state = {
    magicNumber: 23,
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.randomMagicNumber(),
      1000
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  randomMagicNumber = () => {
    return this.setState({
      magicNumber: _.random(100),
    });
  }

  render() {
    return (
      <div className="Home">
        <div className="text-center my-3">
          <h1 className="text-danger">Understand React setState in 10 minutes</h1>
          <h5>by eduardo.vedes</h5>
          <hr />
        </div>
        <div className="text-center my-3">
          <h2 className="text-danger">
            Home Component
          </h2>
          <h3>Hey! I am the Home Component</h3>
          <h5>
            and I'm generating this magicNumber inside my life-cycle
            <h1 className="text-danger">
              { this.state.magicNumber }
            </h1>
          </h5>
          <h5>I'm also passing this number as a prop to my children</h5>
          <hr />
        </div>
         <ChildOfHome magicNumber={this.state.magicNumber} />
         <ChildOfHomeBrother magicNumber={this.state.magicNumber} />
         <ChildOfHomeSister magicNumber={this.state.magicNumber} />
      </div>
    );
  }
}

class ChildOfHome extends Component {
  render() {
    return (
      <div className="text-center">
        <h2 className="text-danger">
          Child Of Home (Sibling Component)
        </h2>
        <h5>
          Hey! I'm the Child of Home Component and the Magic Number my parent gave me is
        </h5>
        <h1 className="text-danger">
          {this.props.magicNumber}
        </h1>
        <h5>I'm rendering props directly and as you can check I keep re-rendering myself according to the flow of the props cascade</h5>
        <hr />
      </div>
    )
  }
}

class ChildOfHomeBrother extends Component {
  state = {
    magicNumber: 0,
  }

  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber,
    });
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="text-danger">
          Child Of Home Brother (Sibling Component)
        </h2>
        <h5>
          Hey! I'm the Child of Home Brother Component and the Magic Number my parent gave me is
        </h5>
        <h1 className="text-danger">
          {this.state.magicNumber}
        </h1>
        <h5>I'm receiving magicNumber as a prop from my father, <span className="text-danger">{this.props.magicNumber}</span>  , and invoking componentDidMount to set this info in the state.</h5>
        <h5>After that I'm rendering my own state and as you see changes to props that come from my father do not trigger my re-rendering anymore</h5>
        <h3 className="mt-5">Why does this happen?</h3>
        <h5>Because in the render() method you're calling the state and not the props so render() doesn't know he needs to trigger a re-rendering of the DOM</h5>
        <h5>As a result, the component is not re-rendered and ComponentDidMount that only runs once each time the component is rendered, is not invoked anymore.</h5>
        <hr />
      </div>
    )
  }
}

class ChildOfHomeSister extends Component {
  state = {
    magicNumber: 0,
  }

  componentDidMount() {
    this.setState({
      magicNumber: this.props.magicNumber,
    });
  }

  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      this.setState({
        magicNumber: this.props.magicNumber,
      });
    }
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="text-danger">
          Child Of Home Sister (Sibling Component)
        </h2>
        <h5>Hey! I'm the Child of Home Sister Component and the Magic Number my parent gave me is</h5>
        <h1 className="text-danger">
          {this.state.magicNumber}
        </h1>
        <h5>I'm receiving magicNumber as a prop from my father, <span className="text-danger">{this.props.magicNumber}</span>  , and invoking componentDidMount to set this info in the state.</h5>
        <h5>As I'm a very smart girl, and I saw that Brother isn't able to keep rendering state updated I'm going to call componentDidUpdate to help me keep my state updated</h5>
        <h5>As I'm a <span className="text-danger">smartAss WTF Hipster Rockstar</span> I could also call <span className="text-danger">getDerivedStateFromProps!!!</span></h5>
        <h5>which would be worse for a lot of reasons that we'll discuss another time!</h5>
        <h3 className="mt-5">What's Wrong Here?</h3>
        <h5>Guys and Girls, this is an anti-pattern! I'm breaking the props cascade flow for nothing!</h5>
        <h5>I needed to call my friend componentDidUpdate to render and this is an extra cost for perfomance</h5>
        <h5>If you do this everywhere in a big App</h5>
        <h5>You'll end up with lots of unnecessary code</h5>
        <h5>and with big performance problems!</h5>
        <h5>Your code gets dirty and after a few weeks you'll have a lot of small fixes and patches</h5>
        <h5>just to keep everything working!</h5>
        <h3>SO DON'T DO THIS IF YOU DON'T NEED TO CHANGE THE PROPS VALUE!</h3>
      </div>
    );
  }
}

export default Home;
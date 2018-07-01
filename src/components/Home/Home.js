import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      randomTrivia: {},
      currentFact: 'Start Now',
      favorites: []
    }
    this.getRandomFact = this.getRandomFact.bind(this);
    this.saveFact = this.saveFact.bind(this);
    this.deleteFact = this.deleteFact.bind(this);
  }

  componentDidMount(){
    axios.get('/api/random')
      .then(response => {
        this.setState({
          randomTrivia: response.data
        })
      });
  };

  getRandomFact() {
    this.setState({
      currentFact: this.state.randomTrivia[Math.floor(Math.random() * Math.floor(100))]
    });
  };

  saveFact(fact) {
    axios.post('/api/save', {fact})
      .then(response => {
        this.setState({
          favorites: response.data
        })
      })
  };

  deleteFact(id) {
    axios.delete(`/api/delete/${id}`)
      .then(response => {
        this.setState({
          favorites: response.data
        })
      })
  };

  render() {
    console.log(this.state);

    const favList = this.state.favorites.map((fact, index)=> {
      return (
        <p key={index} onClick={()=>this.deleteFact(index)}>{fact}</p>
      )
    })

    return (
      <div>
        <div>
          <h3>{this.state.currentFact}</h3>
          <button onClick={()=>this.getRandomFact()}>Randomize</button>
          <button onClick={()=>this.saveFact(this.state.currentFact)}>Save Fact</button>
        </div>
        <div>
          {favList}
        </div>
      </div>
    )
  }
};

export default Home;
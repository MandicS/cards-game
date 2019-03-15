import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    card: {
      images: { png: 'https://deckofcardsapi.com/static/img/JD.png' },
      value: '12',
    },
    deck_id: null,
    result: ''
  }

  componentDidMount() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        this.setState({ deck_id: res.data.deck_id })
      })
      .catch(err => {
        console.log(err);
      })
  }

  clickCard = () => {
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      .then(res => {
        const prevCard = this.state.card.value
        res.data.cards.map(card => {
          if (card.value === 0) { card.value = 10 }
          if (card.value === 'ACE') { card.value = 11 }
          if (card.value === 'JACK') { card.value = 12 }
          if (card.value === 'QUEEN') { card.value = 13 }
          if (card.value === 'KING') { card.value = 14 }
          if (prevCard > card.value) {
            this.setState({result: 'win'})
          } else (
            this.setState({result: 'lose'})
          )
          this.setState({ card: card })
          console.log(card.value)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  upHandler = () => {
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      .then(res => {
        const prevCard = this.state.card.value
        res.data.cards.map(card => {
          if (card.value === '0') { card.value = '10' }
          if (card.value === 'ACE') { card.value = '11' }
          if (card.value === 'JACK') { card.value = '12' }
          if (card.value === 'QUEEN') { card.value = '13' }
          if (card.value === 'KING') { card.value = '14' }
          card.value = parseInt(card.value ,10)
          if (prevCard < card.value) {
            this.setState({result: 'win'})
          } else (
            this.setState({result: 'lose'})
          )
          this.setState({ card: card })
          console.log(typeof(card.value), card.value, ' up')
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  downHandler = () => {
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      .then(res => {
        const prevCard = this.state.card.value
        res.data.cards.map(card => {
          if (card.value === '0') { card.value = '10' }
          if (card.value === 'ACE') { card.value = '11' }
          if (card.value === 'JACK') { card.value = '12' }
          if (card.value === 'QUEEN') { card.value = '13' }
          if (card.value === 'KING') { card.value = '14' }
          card.value = parseInt(card.value ,10)
          if (prevCard > card.value) {
            this.setState({result: 'win'})
          } else (
            this.setState({result: 'lose'})
          )
          this.setState({ card: card })
          console.log(typeof(card.value), card.value, ' down')
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <img src={this.state.card.images.png} alt={this.state.card.value}></img>
        <div>
          <button onClick={this.upHandler}>Up</button>
          <button onClick={this.downHandler}>Down</button>
          <h1>{this.state.result}</h1>
        </div>
      </div>
    );
  }
}

export default App;

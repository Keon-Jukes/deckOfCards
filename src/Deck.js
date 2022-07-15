import React from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';


const API_URL = `https://www.deckofcardsapi.com/api/deck`;

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         deck: null,
         drawn: [],
        };
        this.drawCard = this.drawCard.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        //deck variable contains the response
        let deck = await axios.get(`${API_URL}/new/shuffle`);
        this.setState({ deck: deck.data });
    }


    async drawCard(){
        let deck_id = this.state.deck.deck_id;
        try {
          let cardUrl = `${API_URL}/${deck_id}/draw/`;
          let cardRes = await axios.get(cardUrl);
          if (!cardRes.data.success) {
            throw new Error("No card remaining!");
          }
          let card = cardRes.data.cards[0];
          console.log(cardRes.data);
          this.setState(st => ({
            drawn: [
              ...st.drawn,
              {
                id: card.code,
                image: card.image,
                name: `${card.value} of ${card.suit}`
              }
            ]
          }));
        } catch (err) {
          alert(err);
        }
      }

    // handleClick(evt){
    //     this.drawCard();
    // }

    render(){
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
        ));
        return(
        <div className='Deck'>
            <h1 className='Deck-title'>CARD DEALER</h1>
            <h2 className='Deck-title subtitle'>♦ Press the button to get a card ♦</h2>  
            <button className='Deck-btn' onClick={this.drawCard}>DEAL ME A CARD!</button>
            <div className='Deck-cardarea'>{cards}</div>
        </div>
        )
    }
}

export default Deck;
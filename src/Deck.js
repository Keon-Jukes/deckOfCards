import React from 'react';
import axios from 'axios';
import Card from './Card';

const API_URL = `https://www.deckofcardsapi.com/api/deck`;

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        deck_id:""
        , remaining: null,
         cards: null,
        };
        this.drawCard = this.drawCard.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        //deck variable contains the response
        let deck = await axios.get(`${API_URL}/new/shuffle`);
        const {deck_id, remaining}  = deck.data;
        this.setState({ deck_id, remaining });
    }


    async drawCard(){
           //refactor axios request to get specific data
            let response = await axios.get(`${API_URL}/${this.state.deck_id}/draw/?count=1`);
            const {cards} = response.data;
            this.setState({ cards, remaining });
    }

    handleClick(evt){
        this.drawCard();
    }

    render(){
        return(
        <div>
            <h1>CARD DEALER</h1>
            <button onClick={this.handleClick}>DEAL ME A CARD</button>
            <Card />
        </div>
        )
    }
}

export default Deck;
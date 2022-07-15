import React from 'react';
import axios from 'axios';

class Deck extends React.Component {
    constructor(props){
        super(props);
        this.state = {deck_id:"", remaining: null, card: null};
        this.drawCard = this.drawCard.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const url = `https://www.deckofcardsapi.com/api/deck/new/`;
        let response = await axios.get(url);
        const {deck_id, remaining}  = response.data;
        this.setState({ deck_id, remaining });
    }


    async drawCard(){
            const url = `https://www.deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`;
            let response = await axios.get(url);
            const {cards} = response.data;
            this.setState({ card: cards, remaining });
    }

    handleClick(evt){
        this.drawCard();
    }

    render(){
        return(
        <div>
            <h1>CARD DEALER</h1>
            <button onClick={this.handleClick}>DEAL ME A CARD</button>
        </div>
        )
    }
}

export default Deck;
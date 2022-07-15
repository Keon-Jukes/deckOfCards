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
         drawn: null,
        };
        this.drawCard = this.drawCard.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        //deck variable contains the response
        let deck = await axios.get(`${API_URL}/new/shuffle`);
        this.setState({ deck: deck.data });
    }


    async drawCard(){
           //refactor axios request to get specific data
           try{
            let cardRes = await axios.get(`${API_URL}/${this.state.deck_id}/draw/?count=1`);
            if(!cardRes.data.success){
                throw new Error("No card remaining!")
            }
            let card = cardRes.data.cards[0];
    
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                     {id: card.code,
                      image: card.image,
                      name: `${card.value} of ${card.suit}`}
                ]
            }))
        } catch(err){
            alert(err);
        }     
    }

    handleClick(evt){
        this.drawCard();
    }

    render(){
        let cards = this.state.drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image} />
        ));
        return(
        <div>
            <h1>CARD DEALER</h1>
            <button onClick={this.handleClick}>DEAL ME A CARD</button>
            {cards}
        </div>
        )
    }
}

export default Deck;
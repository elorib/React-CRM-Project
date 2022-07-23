import { useEffect } from "react";
import { useState } from "react";
import cardsService from "../services/cardsService";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import { Link } from "react-router-dom";
import { deleteCard, editCard } from "../services/cardsService";

const MyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function getCards() {
      const { data } = await cardsService.getAll();
      setCards(data);
    }
    getCards();
  }, []);
  return (
    <>
      <PageHeader
        title={"My cards"}
        description={"lorem ipsum dolor sit amet, consectetur adip"}
      />

      {cards
        ? cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              image={card.bizImage}
              deleteCard={() => deleteCard(card._id)}
              editCard={() => editCard(card._id)}
              _id={card._id}
            />
          ))
        : "no cards"}
      <div className="row">
        <Link to="createcard">Create a new card</Link>
      </div>
    </>
  );
};

export default MyCards;

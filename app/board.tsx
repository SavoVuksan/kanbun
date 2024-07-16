import React, { ChangeEvent, useState } from "react";
import Card, { CardProps } from "./card";
import CardCreator from "./card-creator";

type BoardProps = {
  title: string;
};

export default function Board({ title }: BoardProps) {
  const [cards, setCards] = useState<Map<number, CardProps>>(() => {
    const cards = new Map<number, CardProps>(
      loadCards(1) === null
        ? [
            [0, { id: 0, text: "test", isEditing: false } as CardProps],
            [1, { id: 1, text: "test2", isEditing: false } as CardProps],
          ]
        : JSON.parse(loadCards(1)!)
    );
    return cards;
  });

  function handleCardChange(
    event: React.ChangeEvent<HTMLInputElement>,
    card: CardProps
  ) {
    const newCard = cards.get(card.id);
    if (!newCard) {
      throw `Couldn't find card with id ${card.id}`;
    } else {
      newCard.text = event.target.value;
      const newCards = new Map(cards);
      newCards.set(newCard.id, newCard);
      saveCards(1, newCards);
      setCards(newCards);
    }
  }

  function handleCardDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    card: CardProps
  ) {
    // setCards(cards.slice().filter((element) => element.id !== card.id));
    const newCards = new Map(cards);
    newCards.delete(card.id);
    saveCards(1, newCards);
    setCards(newCards);
  }

  function handleCardCreate(
   text: string
  ) {
      const newCards = new Map(cards);
      const newCard = createEmptyCard();
      newCard.text = text;

      newCards.set(newCard.id, newCard);
      saveCards(1, newCards);
      setCards(newCards);
  }

  function onCardBlur(event: any, element: CardProps) {
    const updateCard = cards.get(element.id);
    if (!updateCard) {
      throw `Couldn't find card with id: ${element.id}`;
    } else {
      const newCards = new Map(cards);

      updateCard.isEditing = false;
      newCards.set(updateCard.id, updateCard);
      saveCards(1, newCards);
      setCards(newCards);
    }
  }

  function onCardClick(event: React.MouseEvent, element: CardProps) {
    const updateCard = cards.get(element.id);
    if (!updateCard) {
      throw `Could not find card with id: ${element.id}`;
    } else {
      updateCard.isEditing = true;
      const newCards = new Map(cards);
      newCards.set(updateCard.id, updateCard);
      saveCards(1, newCards);
      setCards(newCards);
    }
  }

  function createEmptyCard(): CardProps {
    return {
      id: constantCounter(),
      text: "",
      isDeletable: true,
      isEditing: false,
      permanentEdit: false,
    };
  }

  function saveCards(boardId: number, cards: Map<number, CardProps>) {
    const savedCards = Array.from(cards).filter(
      ([index, card]) => card.permanentEdit === undefined || !card.permanentEdit
    );
    localStorage.setItem(boardId.toString(), JSON.stringify(savedCards));
  }

  function loadCards(boardId: number) {
    return localStorage.getItem(boardId.toString());
  }

  return (
    <div className="rounded p-4 shadow m-4 max-w-sm flex gap-4 flex-col">
      <h1 className="text-xl text-blue-500">{title}</h1>
      {Array.from(cards).map(([id, element], index) => {
        return (
          <Card
            id={element.id}
            key={element.id}
            text={element.text}
            onChange={(event) => handleCardChange(event, element)}
            onDelete={(event) => handleCardDelete(event, element)}
            // onEnter={(event) =>
            //   element.permanentEdit
            //     ? handleCardCreate(event, element)
            //     : onCardBlur(event, element)
            // }
            isDeletable={element.isDeletable}
            isEditing={element.isEditing}
            onBlur={(event) => onCardBlur(event, element)}
            onClick={(event) => onCardClick(event, element)}
            permanentEdit={element.permanentEdit}
          ></Card>
        );
      })}
      <CardCreator onSubmit={(text) => handleCardCreate(text)}></CardCreator>
    </div>
  );
}
let counter = 3;
let loaded = false;
function constantCounter() {
  if(!loaded){
    const c = localStorage.getItem("counter");
    counter = parseInt(c ? c : "3");
    loaded = true;
  }
  counter++;
  localStorage.setItem("counter", counter.toString());
  return counter - 1;
}

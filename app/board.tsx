import React, { ChangeEvent, useState } from "react";
import Card, { CardProps } from "./card";

type BoardProps = {
  title: string;
};

export default function Board({ title }: BoardProps) {
  const [cards, setCards] = useState<Array<CardProps>>([
    { id: 0, text: "test", isEditing: false },
    { id: 1, text: "test2", isEditing: false },
    {
      id: 2,
      text: "",
      isDeletable: false,
      isEditing: true,
      permanentEdit: true,
    },
  ]);

  function handleCardChange(
    event: React.ChangeEvent<HTMLInputElement>,
    card: CardProps
  ) {
    const index = cards.findIndex((element) => element.id === card.id);
    const newCards = cards.slice();
    newCards[index] = { ...card, text: event.target.value };
    setCards(newCards);
  }

  function handleCardDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    card: CardProps
  ) {
    setCards(cards.slice().filter((element) => element.id !== card.id));
  }

  function handleCardCreate(
    event: React.KeyboardEvent<HTMLInputElement>,
    card: CardProps
  ) {
    const resetCard = cards.find((element) => element.id === card.id);
    const resetCardIndex = cards.findIndex((element) => element.id === card.id);
    const newCards = cards.slice();
    const newCard = createEmptyCard();
    resetCard!.isDeletable = true;
    resetCard!.isEditing = false;
    resetCard!.permanentEdit = false;
    newCards[resetCardIndex] = resetCard!;
    newCards.push(newCard);
    setCards(newCards);
  }

  function onCardBlur(event: any, element: CardProps) {
    const newCards = cards.slice();
    const updateCard = newCards.find((card) => card.id === element.id);
    updateCard!.isEditing = false;
    const updateCardIndex = newCards.findIndex(
      (card) => card.id === element.id
    );
    newCards[updateCardIndex] = updateCard!;

    setCards(newCards);
  }

  function onCardClick(event: React.MouseEvent, element: CardProps) {
    const newCards = cards.slice();
    const updateCard = newCards.find((card) => card.id === element.id);
    updateCard!.isEditing = true;
    const updateCardIndex = newCards.findIndex(
      (card) => card.id === element.id
    );
    newCards[updateCardIndex] = updateCard!;

    setCards(newCards);
  }

  function createEmptyCard(): CardProps {
    return {
      id: constantCounter(),
      text: "",
      isDeletable: false,
      isEditing: false,
      permanentEdit: true,
    };
  }

  return (
    <div className="rounded p-4 shadow m-4 max-w-sm flex gap-4 flex-col">
      <h1 className="text-xl text-blue-500">{title}</h1>
      {cards.map((element, index) => {
        return (
          <Card
            id={element.id}
            key={element.id}
            text={element.text}
            onChange={(event) => handleCardChange(event, element)}
            onDelete={(event) => handleCardDelete(event, element)}
            onEnter={(event) =>
              element.permanentEdit
                ? handleCardCreate(event, element)
                : onCardBlur(event, element)
            }
            isDeletable={element.isDeletable}
            isEditing={element.isEditing}
            onBlur={(event) => onCardBlur(event, element)}
            onClick={(event) => onCardClick(event, element)}
            permanentEdit={element.permanentEdit}
          ></Card>
        );
      })}
    </div>
  );
}
let counter = 3;
function constantCounter() {
  counter++;
  return counter - 1;
}

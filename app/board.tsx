import React, { ChangeEvent, useState } from "react";
import Card, { CardProps } from "./card";

type BoardProps = {
  title: string;
};

export default function Board({ title }: BoardProps) {
  const [cards, setCards] = useState<Map<number, CardProps>>(
    new Map<number, CardProps>([
      [0, { id: 0, text: "test", isEditing: false } as CardProps],
      [1, { id: 1, text: "test2", isEditing: false } as CardProps],
      [
        2,
        {
          id: 2,
          text: "",
          isDeletable: false,
          isEditing: true,
          permanentEdit: true,
        } as CardProps,
      ],
    ])
  );

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
    setCards(newCards);
  }

  function handleCardCreate(
    event: React.KeyboardEvent<HTMLInputElement>,
    card: CardProps
  ) {
    const resetCard = cards.get(card.id);
    if (!resetCard) {
      throw `Couldn't find card with id: ${card.id}`;
    } else {
      const newCards = new Map(cards);
      const newCard = createEmptyCard();

      resetCard.isDeletable = true;
      resetCard.isEditing = false;
      resetCard.permanentEdit = false;
      newCards.set(resetCard.id, resetCard);
      newCards.set(newCard.id, newCard);
      setCards(newCards);
    }
  }

  function onCardBlur(event: any, element: CardProps) {
    const updateCard = cards.get(element.id);
    if (!updateCard) {
      throw `Couldn't find card with id: ${element.id}`;
    } else {
      const newCards = new Map(cards);

      updateCard.isEditing = false;
      newCards.set(updateCard.id, updateCard);
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

      setCards(newCards);
    }
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
      {Array.from(cards).map(([id, element], index) => {
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

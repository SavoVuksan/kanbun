import FeatherIcon from "feather-icons-react";
import React, { ChangeEventHandler } from "react";

export type CardProps = {
  id: number;
  text: string;
  isDeletable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
};

export default function Card({
  text,
  isDeletable,
  onChange,
  onDelete,
  onEnter,
}: CardProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <input
        placeholder="Card"
        type="text"
        value={text}
        className="flex-1 p-1"
        onChange={onChange}
        onKeyUp={(event) => {
          event.key === "Enter" && onEnter ? onEnter(event) : undefined;
        }}
      />
      <button
        onClick={onDelete}
        hidden={isDeletable === undefined ? false : !isDeletable}
      >
        <FeatherIcon icon="x"></FeatherIcon>
      </button>
    </div>
  );
}

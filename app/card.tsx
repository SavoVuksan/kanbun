import FeatherIcon from "feather-icons-react";
import React, { ChangeEventHandler, useState } from "react";

export type CardProps = {
  id: number;
  text: string;
  isDeletable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  isEditing: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  permanentEdit?: boolean;
};

export default function Card({
  text,
  isDeletable,
  onChange,
  onDelete,
  onEnter,
  isEditing,
  onBlur,
  onClick,
  permanentEdit,
}: CardProps) {
  function getInput() {
    return (
      <input
        autoFocus={true}
        placeholder="Card"
        type="text"
        value={text}
        className="flex-1 p-1.5 border-slate-300 border rounded  focus:outline-blue-500 focus:outline-1 text-slate-600"
        onChange={onChange}
        onKeyUp={(event) => {
          event.key === "Enter" && onEnter ? onEnter(event) : undefined;
        }}
        onBlur={onBlur}
      />
    );
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      {!permanentEdit ? (
        isEditing ? (
          getInput()
        ) : (
          <div className="flex flex-1 cursor-pointer" onClick={onClick}>
            {text}
          </div>
        )
      ) : (
        getInput()
      )}

      <button
        onClick={onDelete}
        hidden={isDeletable === undefined ? false : !isDeletable}
      >
        <FeatherIcon icon="x"></FeatherIcon>
      </button>
    </div>
  );
}

import FeatherIcon from "feather-icons-react";

export default function Card() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <input placeholder="Card" type="text" className="flex-1 p-1" />
      <FeatherIcon icon="x"></FeatherIcon>
    </div>
  );
}

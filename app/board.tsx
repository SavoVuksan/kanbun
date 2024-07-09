import Card from "./card";

type BoardProps = {
  title: string;
};

export default function Board({ title }: BoardProps) {
  return (
    <div className="rounded p-4 shadow m-4 max-w-sm flex gap-4 flex-col">
      <h1 className="text-xl text-blue-500">{title}</h1>
      <Card></Card>
    </div>
  );
}

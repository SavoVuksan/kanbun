import { useState } from "react";

export type CardCreatorProps = {
    onSubmit?: (text: string) => void;
}

export default function CardCreator ({onSubmit}: CardCreatorProps) {
    const [text, setText] = useState('');
    return <form className="flex gap-2" onSubmit={(event) => {event.preventDefault(); onSubmit ? onSubmit(text) : null}}> 
    <input className="flex-1 p-1.5 border-slate-300 border rounded  focus:outline-blue-500 focus:outline-1 text-slate-600" value={text} onChange={(event) => setText(event.target.value)}></input>
    <input type="submit" value="Create" className="p-2 cursor-pointer rounded border"/>
    </form>
}
"use client";

import Image from "next/image";
import Board from "./board";
export default function Home() {
  return (
    <div>
      <div>
        <h1 className="shadow p-4 text-4xl font-bold text-blue-500 flex justify-center">
          KANBUN
        </h1>
      </div>
      <div>
        <Board title="Todo" />
      </div>
    </div>
  );
}

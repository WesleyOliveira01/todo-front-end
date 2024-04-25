"use client";

import { CircleX, PencilIcon } from "lucide-react";

interface ItaskProps {
  task: Projeto.task;
  onRemove(id: number): any;
}

const TaskBox = ({ task, onRemove }: ItaskProps) => {
    const parseStatus = (status: Projeto.status):string => {
        if(status != "INICIADO" && status != "EM_ANDAMENTO") return "Finalizado";
        if(status === "EM_ANDAMENTO" ) return "Em andamento";
        return "Iniciado";
    }
  return (
    <li className="flex gap-1 justify-between border border-zinc-300 p-3 rounded-md hover:cursor-pointer">
      <div>{task.name}</div>
      <div>{task.description}</div>
      <div>{parseStatus(task.status)}</div>
      <div className="flex gap-2">
        <button
          onClick={() => onRemove(task.id)}
          className="text-green-600 font-semibold"
        >
          <PencilIcon />
        </button>
        <button
          onClick={() => onRemove(task.id)}
          className="text-pink-600 font-semibold"
        >
          <CircleX />
        </button>
      </div>
    </li>
  );
};

export default TaskBox;

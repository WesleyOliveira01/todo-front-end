/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { TaskService } from "@/service/TaskService";
import { useEffect, useState } from "react";
import TaskBox from "./taskBox";

interface IrenderProps {
    tasksList: Projeto.task[];
}

const RenderTasks = ({tasksList}: IrenderProps) => {
  const service = new TaskService();
  const [tasks, setTasks] = useState<Projeto.task[] | []>([]);
  useEffect(() => {
    if (tasks.length === 0) {
      service
        .getAll()
        .then((res) => setTasks(res.data))
        .catch((e) => console.log(e.getMessage));
    }
  }, [tasks, service]);
  const _deleteTask = (id: number) => {
    service
      .delete(id)
      .then((res) => setTasks([]))
      .catch((e) => console.log(e.getMessage));
  };

  return (
    <section className="container">
      {!tasks ? (
        <div>
          <h1>Tasks not found</h1>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task: Projeto.task) => (
            <TaskBox onRemove={_deleteTask} key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default RenderTasks;

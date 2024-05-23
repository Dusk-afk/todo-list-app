import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodosListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodosListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <Task task={task} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

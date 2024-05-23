"use client";
import { ITask } from "@/types/tasks";
import React, { FormEventHandler, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editTaskValue, setEditTaskValue] = useState<string>(task.text);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({ id: task.id, text: editTaskValue });
    setEditTaskValue("");
    setEditModalOpen(false);
    router.refresh();
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(task);
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <tr key={task.id}>
        <th>{index + 1}</th>
        <td>{task.text}</td>
        <td className="flex gap-5">
          <MdEdit
            cursor="pointer"
            size={25}
            onClick={() => setEditModalOpen(true)}
          />
          <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div className="modal-action">
                <input
                  value={editTaskValue}
                  onChange={(e) => setEditTaskValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <MdDelete
            cursor="pointer"
            className="text-red-500"
            size={25}
            onClick={() => setDeleteModalOpen(true)}
          />
          <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
            <h3 className="font-bold text-lg">Delete Task</h3>
            <div className="mt-2">
              <p>Are you sure you want to delete this task?</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="btn btn-primary flex-grow text-white"
                >
                  No
                </button>
                <button
                  onClick={handleDeleteTodo}
                  className="btn btn-error flex-grow text-white"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default Task;

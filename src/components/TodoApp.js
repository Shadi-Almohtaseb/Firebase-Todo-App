import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebace";
import Todos from "./Todos";

const TodoApp = () => {
  const [todoData, setTodoData] = useState([]);
  const [input, setInput] = useState("");

  const { LogOut, user } = UserAuth();

  const handleLogOut = async () => {
    try {
      await LogOut();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todo = [];
      querySnapshot.forEach((doc) => {
        todo.push({ ...doc.data(), id: doc.id });
      });
      setTodoData(todo);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    } else {
      await addDoc(collection(db, "todos"), {
        name: input,
        completed: false,
      });
    }
    setInput("");
  };

  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  //update todo
  const upDateTodo = async (todoData) => {
    const path = doc(db, "todos", todoData.id);
    await updateDoc(path, {
      compleated: !todoData.compleated,
    });
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-20 bg-white py-5 px-16 shadow-xl">
        <h1 className="text-3xl cursor-pointer">Todo App</h1>
        <div className="flex items-center justify-center gap-7">
          <div className="flex items-center justify-center gap-5 bg-blue-300 rounded-full py-1 pr-4 pl-2 cursor-pointer shadow-xl">
            <img
              className="w-12 h-12 rounded-full"
              src={user?.photoURL}
              alt="photo"
            ></img>
            <div>
              <h1 className="text-lg">{user?.displayName}</h1>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <div className="bg-blue-500 rounded-full py-2 px-4 text-white transition hover:bg-blue-800 shadow-xl">
            {user?.displayName ? (
              <button className="" onClick={handleLogOut}>
                LogOut
              </button>
            ) : (
              <Link to="/">SignIn</Link>
            )}
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-center mt-40">
        <div className="w-4/6 py-7 px-3 bg-white rounded-xl shadow-2xl">
          <h1 className="text-center text-xl">
            write your todos here!, Have a great day 😇
          </h1>
          <form
            onSubmit={createTodo}
            className="flex justify-between items-center px-2 py-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-solid border-2 border-indigo-600 py-2 pl-2 rounded-2xl my-5 hover:border-dotted w-4/5 shadow-xl outline-none focus:border-pink-300"
              placeholder="write a todo..."
            ></input>
            <button className="border-solid border-2 text-5xl border-indigo-600 text-white bg-blue-700 pb-2 px-3 rounded-lg shadow-xl hover:text-blue-700 hover:bg-white transition-all">
              +
            </button>
          </form>
          <div>
            {todoData.map((item, index) => (
              <Todos
                item={item}
                key={index}
                deleteTodo={deleteTodo}
                upDateTodo={upDateTodo}
              />
            ))}
          </div>
          <div className="text-center pt-5">
            {todoData.length
              ? `You have ${todoData.length} todos 👋`
              : `You don't have any assignments! Start adding some`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

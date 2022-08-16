import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import TodoApp from "./components/TodoApp";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/todoapp"
          element={
            <Protected>
              <TodoApp />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

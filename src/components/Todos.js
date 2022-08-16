import React from "react";

const Todos = ({ item, deleteTodo, upDateTodo }) => {
  const styles = {
    container: `flex items-center justify-between bg-slate-300 px-3 mb-2 rounded-md`,
    ContainerComleated: `flex items-center justify-between bg-slate-500 px-3 mb-2 rounded-md first:line-through`,
    itemContainer: `flex items-center gap-6 cursor-pointer`,
    input: `w-4 h-4`,
    itemData: `my-2 text-lg`,
    trash: `cursor-pointer text-xl`,
  };
  return (
    <div>
      <div
        className={
          item.compleated ? styles.ContainerComleated : styles.container
        }
      >
        <div className={styles.itemContainer} onClick={() => upDateTodo(item)}>
          <input
            className={styles.input}
            type="checkbox"
            onChange={() => upDateTodo(item)}
            checked={item.compleated ? "checked" : ""}
          />
          <div className={styles.itemData}>{item.name}</div>
        </div>
        <div onClick={() => deleteTodo(item.id)} className={styles.trash}>
          🗑️
        </div>
      </div>
    </div>
  );
};

export default Todos;

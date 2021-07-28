import classes from "./Todos.module.css";

import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";

const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todosCtx.items.map((item) => {
                return (
                    <TodoItem
                        key={item.id}
                        text={item.text}
                        onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
                    />
                );
            })}
        </ul>
    );
};

export default Todos;

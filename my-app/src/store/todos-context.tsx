import React from "react";
import { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
    items: Todo[];
    addTodo: (todoItem: Todo) => void;
    removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {},
});

export const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const onAddTodo = (todoItem: Todo) => {
        setTodos((prevState) => {
            return [...prevState, todoItem];
        });
    };

    const onRemoveTodo = (todoId: string) => {
        setTodos((prevState) => {
            const newTodos = prevState.filter(
                (todoItem) => todoItem.id !== todoId
            );
            return newTodos;
        });
    };

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: onAddTodo,
        removeTodo: onRemoveTodo,
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

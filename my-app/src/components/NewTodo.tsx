import classes from "./NewTodo.module.css";

import { useRef } from "react";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    const idRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredId = idRef.current!.value;
        const enteredText = textRef.current!.value;

        if (enteredText.trim().length === 0 || enteredId.trim().length === 0) {
            console.log("error");
            return;
        }

        todosCtx.addTodo({ id: enteredId, text: enteredText });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <label htmlFor="id">Todo id</label>
            <input type="text" id="id" ref={idRef} />
            <label htmlFor="text">Todo text</label>
            <input type="text" id="text" ref={textRef} />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default NewTodo;

import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import { useState } from "react";

const Expenses = (props) => {
  const [filter, setFilter] = useState("2020");

  const filterChangeHandler = (value) => {
    setFilter(value);
    console.log(value);
  };

  const expenses = props.expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filter;
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        onDropdownChange={filterChangeHandler}
        selectedFilter={filter}
      />
      <ExpensesChart expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </Card>
  );
};

export default Expenses;

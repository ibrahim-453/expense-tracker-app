import { useState } from "react";
import ExpenseList from "./ExpenseList";

function AddExpense() {
  const [select, setSelect] = useState("")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [expense, setExpense] = useState([])
  const url = "http://localhost:3000/expenses"

  const add = async () => {
    if (title !== "" && category !== "" && amount !== "" && date !== "") {
      const data = { select, title, category, amount, date };
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
      })
      res = await res.json()
      if (res) {
        setExpense([...expense, res])
        setSelect("")
        setTitle("")
        setCategory("")
        setAmount("")
        setDate("")
      }
    } else {
      alert("Please fill all the fields")
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl mx-auto px-4 py-6 bg-white rounded-2xl shadow-md space-y-4 mt-6">
      <h2 className="text-center text-black font-mono font-semibold text-lg md:text-2xl">
        Expense Tracker App
      </h2>

      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        value={select}
        onChange={(e) => setSelect(e.target.value)}
      >
        <option value="" disabled>Select Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />

      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />

      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <button
        className="w-full md:w-auto bg-green-600 text-white text-sm md:text-base px-4 py-2 rounded-lg hover:bg-green-700 transition"
        onClick={add}
      >
        {select === "income" ? "Add Income" : "Add Expense"}
      </button>

      <ExpenseList expense={expense} setExpense={setExpense} />
    </div>
  )
}

export default AddExpense;

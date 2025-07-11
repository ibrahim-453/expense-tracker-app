import { useEffect, useState } from "react";
import EditList from "./EditList";

function ExpenseList({ expense, setExpense }) {
  const [edit, setEdit] = useState(null)git
  const url = "http://localhost:3000/expenses"

  const getdata = async () => {
    let res = await fetch(url);
    res = await res.json();
    setExpense(res);
  };

  const deletelist = async (id) => {
    let res = await fetch(url + "/" + id, { 
      method: "DELETE" })
    res = await res.json();
    if (res) {
      alert("Item Deleted")
      getdata()
    }
  };

  useEffect(() => {
    getdata()
  }, []);

  return (
    <div className="space-y-4 mt-6">
      {expense.map((data) => (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-sm md:text-base" key={data.id}>
          {edit === data.id ? (
            <EditList
              data={data}
              onUpdate={() => {
                setEdit(null);
                getdata();
              }}
              onCancel={() => setEdit(null)}
            />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {data.select === "income" ? "💰 Income" : "📾 Expense"}
              </h3>
              <p>Title: <span className="font-medium">{data.title}</span></p>
              <p>Category: <span className="font-medium">{data.category}</span></p>
              <p>Amount: <span className="font-medium">Rs. {data.amount}</span></p>
              <p>Date: <span className="font-medium">{data.date}</span></p>
              <div className="flex flex-col md:flex-row gap-2 mt-3">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setEdit(data.id)}
                >EDIT</button>
                <button
                  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
                  onClick={() => deletelist(data.id)}
                >DELETE</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ExpenseList;
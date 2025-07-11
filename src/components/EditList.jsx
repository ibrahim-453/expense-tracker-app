import { useState } from "react";

function EditList({ data, onUpdate, onCancel }) {
  const [editform, setEditForm] = useState({ ...data })
  const url = "http://localhost:3000/expenses"

  const handleEdit = (e) => {
    setEditForm({ ...editform, [e.target.name]: e.target.value })
  };

  const onSave = async () => {
    let res = await fetch(url + data.id,{
      method: "PUT",
      body: JSON.stringify(editform)
    })
    res = await res.json()
    if (res) {
      alert("Updated The Expense")
      onUpdate()
    }
  };

  return (
    <div className="space-y-2">
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        name="select"
        onChange={handleEdit}
        value={editform.select}
      >
        <option value="" disabled>Select Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="text" name="title" placeholder="Title" onChange={handleEdit} value={editform.title} />
      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="text" name="category" placeholder="Category" onChange={handleEdit} value={editform.category} />
      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="number" name="amount" placeholder="Amount" onChange={handleEdit} value={editform.amount} />
      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="date" name="date" onChange={handleEdit} value={editform.date} />

      <div className="flex gap-2 mt-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" onClick={onSave}>SAVE</button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditList;

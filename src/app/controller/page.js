"use client";
import { useState } from "react";

export default function GetAmount() {
  const [formData, setFormData] = useState({
    class: '',
    amount: '',
    user: ''
  });
  const [buttonDisable, setButtonDisable] = useState(false)

  const generateClassOptions = () => {
    const options = [];
    for(let i=1;i<=20;i++) {
      options.push(`1年${i < 10 ? "0" + i : i}班`)
    }
    for(let i=1;i<=20;i++) {
      options.push(`2年${i < 10 ? "0" + i : i}班`)
    }
    for(let i=1;i<=20;i++) {
      options.push(`3年${i < 10 ? "0" + i : i}班`)
    }

    return options;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisable(true)

    try{
      const res = await fetch(("/api/controller"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message)

      setFormData({
        class: "",
        amount: "",
        user: ""
      });
      setButtonDisable(false)
    }catch(error) {
      console.log(`error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-green-600 text-center">增加袋數</h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-green-700 font-medium">班級</label>
          <select
            required
            value={formData.class}
            onChange={(e) => setFormData({...formData, class: e.target.value})}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          >
            <option value="">請選擇班級</option>
            {generateClassOptions().map((classNum, index) => (
              <option key={index} value={classNum}>
                {classNum}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-green-700 font-medium">新增袋數</label>
          <input
            type="number"
            required
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
        </div>

        <div className="flex flex-col">
        <label className="mb-1 text-sm text-green-700 font-medium">操作者</label>
          <input
            type="text"
            required
            value={formData.user}
            onChange={(e) => setFormData({...formData, user: e.target.value})}
            className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={buttonDisable}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  );
}

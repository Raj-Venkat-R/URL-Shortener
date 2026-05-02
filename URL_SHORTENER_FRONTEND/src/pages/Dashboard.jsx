// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  const create = async () => {
    await axios.post("/shorten", { originalUrl: url });
    fetch();
  };

  const fetch = async () => {
    const res = await axios.get("/urls");
    setData(res.data);
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div>
      <input onChange={e => setUrl(e.target.value)} />
      <button onClick={create}>Shorten</button>

      {data.map(item => (
        <div key={item._id}>
          <a href={`http://localhost:4000/${item.shortCode}`}>
            {item.shortCode}
          </a>
          <p>{item.clicks}</p>
        </div>
      ))}
    </div>
  );
}
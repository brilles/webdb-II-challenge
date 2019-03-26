import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [zoos, setZoos] = useState([]);

  useEffect(() => {
    (async function getData() {
      try {
        const res = await axios.get('https://zoos-app.herokuapp.com/api/zoos');
        setZoos(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1>Zoos:</h1>
      {zoos.map(zoo => (
        <h3 key={zoo.id}>{zoo.name}</h3>
      ))}
    </div>
  );
}

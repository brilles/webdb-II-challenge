import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [zoos, setZoos] = useState([]);

  const deleteZoo = id => {
    axios
      .delete(`https://zoos-app.herokuapp.com/api/zoos/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async function getData() {
      try {
        const res = await axios.get('https://zoos-app.herokuapp.com/api/zoos');
        setZoos(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [zoos]);

  return (
    <div className="App">
      <h1>Zoos:</h1>
      {zoos.map(zoo => (
        <>
          <h3 key={zoo.id}>{zoo.name}</h3>
          <button onClick={() => deleteZoo(zoo.id)}>delete</button>
        </>
      ))}
    </div>
  );
}

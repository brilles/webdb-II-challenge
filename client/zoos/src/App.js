import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [zoos, setZoos] = useState('');

  useEffect(() => {
    (async function getData() {
      const res = await axios.get('https://zoos-app.herokuapp.com/api/zoos');
    })();
  }, []);

  return (
    <div className="App">
      <h1>Zoos:</h1>
      {/* {zoos.map(zoo => (
        <Zoo name={zoo.name}/>
      ))} */}
    </div>
  );
}

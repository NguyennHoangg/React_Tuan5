import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  
  const[data, setData] = useState([]);
  const[search, setSearch] = useState("");
  const[filterData, setFilterData] =useState([]);


  useEffect(() => {
    async function fetchData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = res.json();

        setData(data);
        console.log(data)
    }

    fetchData();
  }, [])


  return (
    <>
     {data.map((item) =>{
      return <div key={item.id}>
        <h2>{item.title}</h2>
        <h2>{item.body}</h2>
      </div>
     })
     }
    </>
  )
}

export default App

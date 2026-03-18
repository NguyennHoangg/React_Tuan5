import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const[data, setData] = useState([]);
  const[search, setSearch] = useState("");
  const[filterData, setFilterData] =useState([]);


  useEffect(() => {
    async function fetchData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();

        setData(data);
        setFilterData(data);
    }

    fetchData();
  }, []);


  useEffect(() =>{
    console.log(search)
    if(search===""){
      setFilterData(data);
    }else{
      const result = data.filter((item) =>{
      return item.title.toLowerCase().includes(search.toLowerCase());
    })

    setFilterData(result);
    }
  }, [data, search]);



  return (
    <>
    <input placeholder='search' value={search} type='text' onChange={(e) => setSearch(e.target.value)}></input>
    <select>
      <option value={search}>1</option>
      <option>2</option>
    </select>
     {filterData.map((item) =>{
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

import './App.css';
import {useState , UseEffect, useEffect} from 'react'
function App() {

  const [data,setdata] = useState([]);
  const [load,setload] = useState(false);
  const [error,seterror] = useState(false);
  const [page,setpage] = useState(1);

  useEffect(()=>{
    seterror(false)
    setload(true)

    function Fetchdata(){
      fetch("https://jsonplaceholder.typicode.com/posts?_limits=20&_page=${page}")
      .then((res)=> res.json())
      .then((data) => {
        setdata(data)
        seterror(false)
        setload(false)
      })
      .catch((error) => {
        seterror(true)
        setload(true)
      })
    }
    Fetchdata()
  },[page])

  return load ? <h1>Loading...</h1> : error ? <h1>Somthing Error</h1> : (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)", margin:"20px"}}>
        {data.map((Element) => (
          <div style={{border:"2px solid black", margin:"2px",textAlign:"center"}}>
            <h2>{Element.id}</h2>
            <h3>{Element.title}</h3>
          </div>
        ))}
      </div>
      <button onClick={()=>setdata(page-1)}>Prev</button>
      <h4>{page}</h4>
      <button onClick={()=>setdata(page+1)}>Next</button>
    </div>
  );
}

export default App;

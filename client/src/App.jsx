import {useEffect,useState} from "react";


function App(){


const [tasks,setTasks]=useState([]);

const [title,setTitle]=useState("");



const API="http://localhost:5000";



// Load tasks

useEffect(()=>{

fetch(`${API}/tasks`)
.then(res=>res.json())
.then(data=>setTasks(data));

},[]);





// Add Task

function addTask(){


fetch(`${API}/tasks`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title:title
})

})

.then(res=>res.json())

.then(task=>{

setTasks([
...tasks,
task
]);

setTitle("");

});


}




return (

<div>


<h1>
DevOps Task Manager
</h1>


<input

value={title}

onChange={
e=>setTitle(e.target.value)
}

placeholder="New task"
/>



<button onClick={addTask}>
Add
</button>



<h2>
Tasks
</h2>



{
tasks.map(task=>(

<div key={task.id}>

{task.title}

</div>


))
}



</div>

);


}


export default App;
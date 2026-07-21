import {useEffect,useState} from "react";

function App(){

const API="http://localhost:5000";

const [tasks,setTasks]=useState([]);

const [title,setTitle]=useState("");

// Load Tasks
useEffect(()=>{

loadTasks();

},[]);

function loadTasks(){

fetch(`${API}/tasks`)

.then(res=>res.json())

.then(data=>setTasks(data));

}

// Add Task

function addTask(){

if(!title.trim()) return;

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

.then(()=>{

setTitle("");

loadTasks();

});


}

// Complete Task

function completeTask(task){

fetch(
`${API}/tasks/${task.id}`,
{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

completed:!task.completed

})


})

.then(()=>loadTasks());


}

// Delete Task

function deleteTask(id){

fetch(
`${API}/tasks/${id}`,
{

method:"DELETE"

})

.then(()=>loadTasks());


}

return (

<div style={{
padding:"40px",
fontFamily:"Arial"
}}>


<h1>
🚀 DevOps Task Manager
</h1>

<div>

<input

value={title}

onChange={
e=>setTitle(e.target.value)
}

placeholder="Enter task"

/>

<button onClick={addTask}>
Add Task
</button>

</div>

<h2>
My Tasks
</h2>

{

tasks.map(task=>(

<div

key={task.id}

style={{

margin:"10px",

padding:"15px",

border:"1px solid gray",

display:"flex",

justifyContent:"space-between"

}}

>
<span

style={{

textDecoration:
task.completed?
"line-through":
"none"

}}

>

{task.title}

</span>

<div>


<button

onClick={()=>
completeTask(task)
}

>

{
task.completed?
"Undo":
"Complete"
}

</button>

<button

onClick={()=>
deleteTask(task.id)
}

>

Delete

</button>



</div>



</div>


))


}



</div>

);


}

export default App;
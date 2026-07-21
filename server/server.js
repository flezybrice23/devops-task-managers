const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();

const PORT = 5000;


app.use(cors());
app.use(express.json());


const FILE = "./data/tasks.json";


// Read tasks
function getTasks(){

    const data = fs.readFileSync(FILE);

    return JSON.parse(data);

}


// Save tasks
function saveTasks(tasks){

    fs.writeFileSync(
        FILE,
        JSON.stringify(tasks,null,2)
    );

}



// GET ALL TASKS
app.get("/tasks",(req,res)=>{

    const tasks = getTasks();

    res.json(tasks);

});

app.get("/", (req,res)=>{

    res.json({
        message:"Task Manager API is running"
    });

});




// CREATE TASK
app.post("/tasks",(req,res)=>{


const tasks = getTasks();


const {title}=req.body;



if(!title || title.trim()===""){

    return res.status(400)
    .json({
        message:"Task title is required"
    });

}



const newTask={

id:Date.now(),

title:title,

completed:false

};



tasks.push(newTask);


saveTasks(tasks);


res.status(201)
.json(newTask);



});




// UPDATE TASK
app.put("/tasks/:id",(req,res)=>{


    const tasks=getTasks();


    const task = tasks.find(
        t=>t.id == req.params.id
    );


    if(!task){

        return res.status(404)
        .json({
            message:"Task not found"
        });

    }


    task.completed =
    req.body.completed;


    saveTasks(tasks);


    res.json(task);


});





// DELETE TASK

app.delete("/tasks/:id",(req,res)=>{


const tasks=getTasks();


const filtered =
tasks.filter(
t=>t.id != req.params.id
);


saveTasks(filtered);


res.json({
message:"Task deleted"
});


});





app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});

app.get("/health",(req,res)=>{

    res.json({
        status:"ok",
        service:"task-manager-backend"
    });

});
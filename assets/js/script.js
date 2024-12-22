const container=document.querySelector(".container")
const loading =document.querySelector(".loading")
const userId =document.querySelector("#userId")
const form=document.querySelector("form")
const input=document.querySelector("#title")
let update = false
 let updatedId;
let todos= [];
let users= [];
let task;
userId.innerHTML=`<option value="">select user</option>`
container.innerHTML= ""
async function read() {
    loading.style.display= "block"


await fetch('https://jsonplaceholder.typicode.com/todos')
  .then(res=> res.json() )
  .then(res=> { 
     todos=res   
     loading.style.display= "none" 
}
    )
  .catch(err=> console.log(err))

  await fetch('https://jsonplaceholder.typicode.com/users')
  .then(res=> res.json() )
  .then(res=> { 
     users=res   
     loading.style.display= "none" 
}
    )
  .catch(err=> console.log(err))

  users.forEach(user=>(userId.innerHTML += `<option value="${user.id}">${user.name}</option>` ))
  todos.forEach(todo =>(container.innerHTML += `<div class="card ${todo.completed ? "done" : " "}">
  <h1>${todo.title}</h1> : <span>${users.find(user => user.id==todo.userId).name}</span>
  
<button onclick="statusUpdate(${todo.id})">status Update</button>
<button onclick="infoUpdate(${todo.id})">info Update </button>
<button onclick="deleteTask(${todo.id})">delete </button></div> 
  
  `))
}

read()

form.addEventListener("submit" , (e)=>{
  e.preventDefault();
  const newtask={
    userId: userId.Value,
    title: title.value,
    completed: update ? task.completed : false
  }

  title.value=" "

  let url= update ? `https://jsonplaceholder.typicode.com/todos/${updatedId}` 
                  : `https://jsonplaceholder.typicode.com/todos`
   fetch(url,{
   method : update ? 'PUT': 'POST' ,
   headers :{
   "Content-Type" : "application/json"
  },
  body:JSON.stringify(task)
})
.then(res => res.json())
.then(res=>{console.log(res)
  read()
})


.catch(err=>console.log(err))
update = false
})


async function statusUpdate(id){

await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res=> res.json() )
  .then(res=> { 
     task=res   
} )
.catch(err=> console.log(err))
task.completed=!task.completed

await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
  method : "PUT",
  headers :{
   "Content-Type" : "application/json"
  },
  body:JSON.stringify(task)
})
.then(res => res.json())
.then(res=>{console.log(res)
 
})

.catch(err=>console.log(err))
read()
}



async function infoUpdate(id){
  updatedId = id
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(res=> res.json() )
  .then(res=> { 
     task=res   
} )
.catch(err=> console.log(err))
title.value=task.title
userId.value= task.userId
update= true
}




function deleteTask(id){
  fetch (`https://jsonplaceholder.typicode.com/todos/${id}` ,{
    method : 'DELETE'
  })
  .then (res => res.json())
  .then (res => {
    console.log(res)
    read()
  })
  .catch (err=>console.log(err))
}

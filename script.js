const fetchdata = JSON.parse(localStorage.getItem('todo'));
let add = document.getElementById("addbtn");
let text = "";
let totaltask = document.getElementById("task");
let totaltask1 = document.getElementById("task1");
let outof = document.getElementById("outof");
let appendnode = fetchdata ? fetchdata : [];
let count = fetchdata ? fetchdata.length+1 : 1;

const updatetotal=(len)=>{
    totaltask.innerHTML = len;
    totaltask1.innerHTML = len;
    console.log(totaltask1.innerHTML);
}
const complete = (appendnode) =>{
    let count = 0;
    for(let i=0;i<appendnode.length;i++){
        if(appendnode[i].stat == 1){
            count++;
        }
    }
    outof.innerHTML = count;
}

let displaydata = (data) =>{
    let parent = document.getElementById("todo-list");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    for(let i = 0 ;i<data.length;i++){
        let todo_list = document.getElementById('todo-list');
        let list = document.createElement('div');
        list.classList.add('todo');
        let div1 = `<div class="todo"> <div>
            ${data[i].stat ? `<input type="checkbox" name="" id="checkbox" class="checkbox"  onclick={checkbox(this)} checked> <span class="line">${data[i].text}</span>` : `<input type="checkbox" name="" id="checkbox" class="checkbox" onclick={checkbox(this)}> <span>${data[i].text}</span>`}
            <span class="hidden">${data[i].id}</span></div><span class="hidden">${data[i].id}</span>
            <i id="deletenode" class="fas fa-trash-alt" onclick={deletenode(this)}></i> </div>`;
        todo_list.insertAdjacentHTML('beforeend',div1);
        
    }
    updatetotal(data.length)
    complete(data);
};

if(fetchdata){
    
    displaydata(fetchdata);
}
add.addEventListener('click',()=>{
    text = document.getElementById("text").value;
    if(text!= ""){
        addnode(text);
        document.getElementById("text").value = "";
    }
    else{
        alert("Please enter something in text..");
    }
})
const addnode = (text)=>{
    let todo_list = document.getElementById('todo-list');
    let list = document.createElement('div');
    list.classList.add('todo');
    let tmpobj = {
        id : count = count + 1000,
        stat : 0,
        text : text,
    }
    
    appendnode.push(tmpobj);
    addintolocal(appendnode);
    displaydata(appendnode);
    updatetotal(appendnode.length)
}

const addintolocal = (appendnode)=>{
    
    localStorage.setItem("todo",JSON.stringify(appendnode));
}
checkbox = (e)=>{
    const siblingElement = e.nextElementSibling;
    const id = e.nextElementSibling.nextElementSibling.innerHTML;
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            if(e.checked){
                siblingElement.style.textDecoration = "Line-through";
                appendnode[i].stat = 1;
            }
            else{
                siblingElement.style.textDecoration = "none";
                appendnode[i].stat = 0;
            }
        }
    }
    addintolocal(appendnode);
    complete(appendnode);
}
deletenode = (e) =>{
    const id = e.previousElementSibling.innerHTML;
    console.log(id);
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            appendnode.splice(i,1);
        }
    }
    addintolocal(appendnode);
    displaydata(appendnode);
    complete(appendnode);
}
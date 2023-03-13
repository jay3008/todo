const fetchdata = JSON.parse(localStorage.getItem('todo'));
let add = document.getElementById("addbtn");
let text = "";
let totaltask = document.getElementById("task");
let totaltask1 = document.getElementById("task1");
let outof = document.getElementById("outof");
let appendnode = fetchdata ? fetchdata : [];
let count = fetchdata ? fetchdata.length+1 : 1;
let empty_list = document.getElementById('empty');
let task_todo = document.getElementById('task-todo');

const updateTotal=(len)=>{
    if(len == 0){
        empty_list.classList.remove("hidden");
    }
    else{
        empty_list.classList.add("hidden");
    }
    totaltask.innerHTML = len;
    totaltask1.innerHTML = len;
    
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

let displayData = (data) =>{
    let parent = document.getElementById("todo-list");
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    for(let i = data.length-1;i>=0;i--){
        let todo_list = document.getElementById('todo-list');
        let div1 = `<div class="todo" id="nodeid" data-id=${data[i].id}> <div class="textcontainer">
            ${data[i].stat ? `<i class="fa fa-check" onclick={checkBox(this)} aria-hidden="true"></i> <div class="line">${data[i].text}</div>` : `<input type="checkBox" name="" id="checkBox" class="checkbox" onclick={checkBox(this)}> <div class="noline"  id="task-todo">${data[i].text}</div>`}
            </div> <div class="icons">
            ${data[i].stat ? `<i id="deleteNode" class="fas fa-trash-alt" onclick={deleteNode(this)}></i>`:`<i id="deleteNode" class="fas fa-trash-alt" onclick={deleteNode(this)}></i> <i id="editNode" class="fas fa-edit" onclick={editNode(this)}></i>`}
             </div></div>`;
        todo_list.insertAdjacentHTML('beforeend',div1);
    }
    updateTotal(data.length)
    complete(data);
};

if(fetchdata){
    displayData(fetchdata);
}
document.getElementById('text').addEventListener('keydown',(e)=>{
    if(e.key!= ""){
        document.getElementById("text").classList.remove('redborder');
    }
    if(e.key == 'Enter'){
       checkTxt();
    }
})
add.addEventListener('click',()=>{
   checkTxt();
})
const checkTxt= () =>{
    text = document.getElementById("text").value.trim();
    if(text!= ""){
        addNode(text);
        document.getElementById("text").value = "";
    }
    else{
        document.getElementById("text").classList.add('redborder');
        document.getElementById("text").value = text.trim();
        alert("Please enter something in text..");
    }
    
}
const addNode = (text)=>{
    let tmpobj = {
        id : count+=1000,
        stat : 0,
        text : text,
    }
    appendnode.push(tmpobj);
    addIntoLocal(appendnode);
    displayData(appendnode);
    updateTotal(appendnode.length)
}

const addIntoLocal = (appendnode)=>{
    localStorage.setItem("todo",JSON.stringify(appendnode));
}
checkBox = (e)=>{
    const siblingElement = e.nextElementSibling;
    const id = fetchid(e);
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
    addIntoLocal(appendnode);
    complete(appendnode);
    displayData(appendnode);
}
deleteNode = (e) =>{
    const id = fetchid(e);
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            appendnode.splice(i,1);
        }
    }
    addIntoLocal(appendnode);
    displayData(appendnode);
    complete(appendnode);
}

editNode = (e) =>{
    // const info = e.parentElement.parentElement;
    const id = fetchid(e);
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            let target = e.parentElement.previousElementSibling.lastElementChild; 
            target.contentEditable = true;
            // let sel = window.getSelection();
            // sel.collapse(target,0);
            
            let len = target.innerHTML.length;
            // target.setSelectionRange(1,6);
            target.selectionStart = target.selectionEnd = len;
            target.focus();
            // target.createTextRange();    
            // target.collapse(true);
            // target.selectionStart = target.selectionEnd = len;
            target.addEventListener('focusout',()=>{
                appendnode[i].text = target.innerHTML;
                addIntoLocal(appendnode);
                displayData(appendnode);
            })
        }
    }
}

const fetchid = (e) =>{
    const info = e.parentElement.parentElement;
    const data = info.dataset;
    return data.id;
}
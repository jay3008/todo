const fetchdata = JSON.parse(localStorage.getItem('todo'));
let add = document.getElementById("addbtn");
let text = "";
let totaltask = document.getElementById("task");
let totaltask1 = document.getElementById("task1");
let outof = document.getElementById("outof");
let appendnode = fetchdata ? fetchdata : [];
let count = fetchdata ? fetchdata.length+1 : 1;

const updateTotal=(len)=>{
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
            ${data[i].stat ? `<i class="fa fa-check" onclick={checkBox(this)} aria-hidden="true"></i> <span class="line">${data[i].text}</span>` : `<input type="checkBox" name="" id="checkBox" class="checkbox" onclick={checkBox(this)}> <span class="noline">${data[i].text}</span>`}
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
    const info = e.parentElement.parentElement;
    const id = fetchid(e);
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            let target = e.parentElement.previousElementSibling; 
            let editdiv = `<div> <input id="edittext" class="text" type="text" value="${appendnode[i].text}"> </div>`;
            info.insertAdjacentHTML('afterbegin',editdiv);
            target.remove();
            let editedtext = document.getElementById("edittext");
            editedtext.focus();
            let len = editedtext.value.length;
            editedtext.setSelectionRange(len,len);
            editedtext.addEventListener('focusout',()=>{
                appendnode[i].text = editedtext.value;
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
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
        let div1 = `<div class="todo" id="nodeid" data-id=${data[i].id}> <div>
            ${data[i].stat ? `<input type="checkbox" name="" id="checkbox" class="checkbox"  onclick={checkbox(this)} checked> <span class="line">${data[i].text}</span>` : `<input type="checkbox" name="" id="checkbox" class="checkbox" onclick={checkbox(this)}> <span class="noline">${data[i].text}</span>`}
            </div> <div>
            ${data[i].stat ? `<i id="deletenode" class="fas fa-trash-alt" onclick={deletenode(this)}></i>`:`<i id="deletenode" class="fas fa-trash-alt" onclick={deletenode(this)}></i> <i id="editnode" class="fas fa-edit" onclick={editnode(this)}></i>`}
             </div></div>`;
        todo_list.insertAdjacentHTML('beforeend',div1);
    }
    updatetotal(data.length)
    complete(data);
};

if(fetchdata){
    displaydata(fetchdata);
}
document.getElementById('text').addEventListener('keydown',(e)=>{
    if(e.key!= ""){
        console.log(e.key);
        document.getElementById("text").classList.remove('redborder');
    }
    if(e.key == 'Enter'){
        text = document.getElementById("text").value.trim();
        if(text!= ""){
            addnode(text);
            document.getElementById("text").value = "";
        }
        else{
            // document.getElementById("text").value = "hello";
            document.getElementById("text").classList.add('redborder');
            alert("Please enter something in text..");
           
        }
    }
})
add.addEventListener('click',()=>{
    text = document.getElementById("text").value.trim();
    if(text!= ""){
        addnode(text);
        document.getElementById("text").value = "";
    }
    else{
        document.getElementById("text").classList.add('redborder');
        alert("Please enter something in text..");
    }
})
const addnode = (text)=>{
    let tmpobj = {
        id : count+=1000,
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
    addintolocal(appendnode);
    complete(appendnode);
    displaydata(appendnode);
}
deletenode = (e) =>{
    const id = fetchid(e);
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

editnode = (e) =>{
    const info = e.parentElement.parentElement;
    const id = fetchid(e);
    let autofocus = true;
    console.log(id);
    for(let i = 0;i<appendnode.length;i++){
        if(appendnode[i].id == Number(id)){
            let target = e.parentElement.previousElementSibling; 
            console.log(target);
            let editdiv = `<div> <input id="edittext" class="text" type="text" value="${appendnode[i].text}" ${autofocus ? `autofocus=true` : 'autofocus=true'}> </div>`;
            // console.log(editdiv);
            info.insertAdjacentHTML('afterbegin',editdiv);
            console.log('info...',e.parentElement.previousElementSibling);
            target.remove();
            let editedtext = document.getElementById("edittext");
            // editedtext.autofocus;
            editedtext.addEventListener('focusout',()=>{
                appendnode[i].text = editedtext.value;
                addintolocal(appendnode);
                displaydata(appendnode);
            })
        }
    }
}

const fetchid = (e) =>{
    const info = e.parentElement.parentElement;
    const data = info.dataset;
    return data.id;
}
const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const closeBtn = document.querySelectorAll('.close-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');
const formAddTodo = document.querySelector('.add-todo');
const deleteBtn=document.querySelectorAll('.delete-icon');
const pendingBtn=document.querySelectorAll('.pending-icon');
const logoutBtn=document.querySelector('.logout-btn');
const filterForm=document.querySelector('.filter-form');


if(pendingBtn){
    pendingBtn.forEach(btn=>{
        btn.addEventListener('click',pendingBtnEventHandler)
    })
}

if(logoutBtn){
    logoutBtn.addEventListener('click',async function(e){
       sendRequest('/logout','get',undefined,(status,msg)=>{
            window.location.reload('/');
       });
    })
}
if(deleteBtn){
    deleteBtn.forEach(btn=>{
        btn.addEventListener('click',deleteBtnEventHandler)
    })
}

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.elements['username'].value;
    const password = this.elements['password'].value;
    const payload=JSON.stringify({username,password});
    sendRequest(this.action,this.method,payload,(status,msg)=>{
        if(status!=200 && status!=201 && msg){
            this.childNodes[1].textContent=msg;
        }
        else{
           window.location.reload();
        }
    });
})

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.elements['username'].value;
    const password = this.elements['password'].value;
    const payload=JSON.stringify({
        username,
        password,
    });
    sendRequest(this.action,this.method,payload,(status,msg)=>{
        if(status!=200 && status!=201 && msg){
            this.childNodes[1].textContent=msg;
        }
        else{
           window.location.reload();
        }
    });
})


if (formAddTodo) {
    formAddTodo.addEventListener('submit', function (e) {
        e.preventDefault();
        const todo = this.elements['todolist'].value;
        const pending = true;
        const user_id = this.elements['user_id'].value;
        const payload=JSON.stringify({
            todo,
            pending,
            user_id
        });
        sendRequest(this.action,this.method,payload,(status,msg)=>{
            window.location.reload();
        });
    })
}

if(filterForm){
    filterForm.addEventListener('change',function(e){
        const filter=this.elements['filter'].value;
        sendRequest(this.action+`?filter=${filter}`,this.method,undefined,(status,data)=>{
            if(status==200 || status==201){
                const todolists=document.querySelector('.todolists');
                todolists.textContent="";
                console.log(data);
                data.forEach((todolist)=>{
                    //create the li tag
                    const li=document.createElement('li');
                    li.setAttribute('id',todolist.id);

                    //create the p tag
                    const p=document.createElement('p');
                    p.textContent=todolist.todo;

                    //create the pending icon div
                    const div1=document.createElement('div');
                    div1.classList.add('pending-icon');
                    div1.innerHTML=todolist.pending?'<i class="fa-sharp fa-solid fa-xmark" style="color: #e41111; font-size:2rem"></i>':' <i class="fa-solid fa-check" style="color: #0b9334;"></i>'

                    //create the delete icon div
                    const div2=document.createElement('div');
                    div2.classList.add('delete-icon')
                    div2.innerHTML=' <i class="fa-sharp fa-solid fa-trash"></i>';

                    
                    //append the li child elements to li
                    li.append(p);
                    li.append(div1);
                    li.append(div2);
                    
                    //now append li to the todolists
                    todolists.append(li);

                    //adding event handler 
                    console.log(div1);
                    div1.addEventListener('click',pendingBtnEventHandler)
                    div2.addEventListener('click',deleteBtnEventHandler)
                })
            }
        })
    })
}

//signup and login form popup controller using login and signup button
if (signupBtn && loginBtn) {
    signupBtn.addEventListener('click', function (e) {
        if (loginForm.style.display != "block") {
            signupForm.childNodes[1].textContent="";
            signupForm.style.display = "block";
        }
    })

    loginBtn.addEventListener('click', function (e) {
        if (signupForm.style.display != "block") {
            loginForm.childNodes[1].textContent="";
            loginForm.style.display = "block";
        }
    })

    closeBtn.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            console.log(e.target.parentElement);
            e.target.parentElement.style.display = "none";
        })
    })
}


//send request handler
const sendRequest=async function(url,method,payload,callback){
    try{
        const res=await fetch(url, {
            method: method,
            headers: {
                "content-type": 'application/json',
            },
            body: payload
    
        });
        let msg="";
        if(res.status!=200 && res.status!=201){
            const data=await res.json();
            msg=data.msg;
            callback(res.status,msg);
        }
        if(res.status==200 || res.status==201){
            const data=await res.json();
            callback(res.status,data.data)
        }
    }
    catch(e){
        console.log(e);
    }
}

function deleteBtnEventHandler(e){
    const parentElement=e.target.parentElement;
    console.log(parentElement);
    sendRequest('/'+parentElement.id,'delete',undefined,()=>{
        //manually change the dom using js
        parentElement.classList.add('fall');
        parentElement.addEventListener('transitionend',function(){
            parentElement.remove();
        })
    });
}

async function pendingBtnEventHandler(e){
        const parentElement=e.target.parentElement;
        sendRequest('/'+parentElement.id,'put',undefined,(status,msg)=>{
            if(status==200 || status==201){
                window.location.reload();
            }
        });
}
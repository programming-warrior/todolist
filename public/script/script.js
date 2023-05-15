const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const closeBtn = document.querySelectorAll('.close-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');
const formAddTodo = document.querySelector('.add-todo');
const deleteBtn=document.querySelectorAll('.delete-icon');
const pendingBtn=document.querySelectorAll('.pending-icon');
const logoutBtn=document.querySelector('.logout-btn');


if(pendingBtn){
    pendingBtn.forEach(btn=>{
        btn.addEventListener('click',async function(e){
            const parentElement=e.target.parentElement;

            sendRequest('/'+parentElement.id,'put',undefined,(status,msg)=>{
                if(status==200 || status==201){
                    window.location.reload();
                }

            });
        })
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
        btn.addEventListener('click',function(e){
            const parentElement=e.target.parentElement;
            sendRequest('/'+parentElement.id,'delete',undefined,()=>{
                //manually change the dom using js
                parentElement.classList.add('fall');
                parentElement.addEventListener('transitionend',function(){
                    parentElement.remove();
                })
            });
        })
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
        }
        callback(res.status,msg);
    }
    catch(e){
        console.log(e);
    }
}
let input = document.querySelector(".input") ;
let btn = document.querySelector(".add") ;
let tasks = document.querySelector(".tasks") ;

let arrData = []
window.onload = () => {
    if(localStorage.getItem("data")){
        arrData = JSON.parse(localStorage.getItem("data")) ;
        addTasks(arrData)
    }
}
btn.onclick = (e) => {
    arrData.push({"id":Date.now(),"message":input.value});
    localStorage.setItem("data",JSON.stringify(arrData)) ;
    input.value = "" ;
    addTasks(arrData) ;
}

function addTasks(arrData){
    tasks.innerHTML = "" ;
    arrData.forEach(element => {
        let task = document.createElement("div") ;
        let p = document.createElement("p") ;
        p.setAttribute("contenteditable","true") ;
        p.style.flexGrow = "1" ;
        p.innerHTML = element.message ;
        let span = document.createElement("span") ;
        span.style.marginLeft = "10px" ;
        span.innerHTML = "delete" ;
        span.className = "delete" ;
        let ctn = document.createElement("div") ;
        ctn.style.display = "inline-block" ;
        let span2 = document.createElement("span") ;
        span2.innerHTML = "update" ;
        span2.className = "update" ;
        ctn.append(span2,span)
        task.classList.add("task") ;
        task.append(p,ctn) ;
        task.id = element.id ;
        tasks.append(task) ;
    });
}

tasks.onclick = (e) => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.parentElement.remove()
        for(let index in arrData){
            if(arrData[index].id == +e.target.parentElement.parentElement.id){
                arrData.splice(index,1) ;
                localStorage.setItem("data",JSON.stringify(arrData)) ;
                break ;
            }
        }
    }
    if(e.target.classList.contains("update")){
        for(let index in arrData){
            if(arrData[index].id == +e.target.parentElement.parentElement.id){
                arrData[index].message = e.target.parentElement.parentElement.children[0].textContent ;
                localStorage.setItem("data",JSON.stringify(arrData)) ;
                break ;
            }
        }
    }
}




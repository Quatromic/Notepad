//Quotes
const quoteTag = document.getElementById("quote"),author = document.getElementById("author")
let randomNumQuote = Math.floor(Math.random() * 15),quote
console.log(randomNumQuote)

const quoteFetcher =  async() => {fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    quoteTag.innerHTML = data[randomNumQuote].text
    author.innerHTML = data[randomNumQuote].author
}).catch(error => console.log(error))}

const caller = async () => {
  const Func1 = await quoteFetcher().then(() => console.log("Success")).catch(error => console.error(error))
}
caller()

//Loading Screen
const loadingScreen = document.getElementById("loader-page")

setTimeout(() => {
  loadingScreen.classList.add("visible")
}, 1000);

//date
const date = new Date()
const dateTag = document.getElementById("date")
const day = (date) => {
  switch(date.getDay()){
    case 1:
      return "Monday"
    case 2:
      return "Tuesday"
    case 3:
      return "Wednesday"
    case 4:
      return "Thursday"
    case 5:
      return "Friday"
    case 6:
      return "Saturday"
    case 7:
      return "Sunday"
  }
}
const month = (date) => {
  switch(date.getMonth() + 1){
    case 1:
      return "Jan"
    case 2:
      return "Feb"
    case 3:
      return "Mar"
    case 4:
      return "Apr"
    case 5:
      return "May"
    case 6:
      return "Jun"
    case 7:
      return "Jul"
    case 8:
      return "Aug"
    case 9:
      return "Sep"
    case 10:
      return "Oct"
    case 11:
      return "Nov"
    case 12:
      return "Dec"
  }
}

dateTag.innerText = `${day(date)} ${date.getDate()}, ${month(date)} ${date.getFullYear()}`

//Notes
//CreateDiv visibility
const create = document.getElementById("createbtn"),createDiv = document.getElementById("create"),exit = document.getElementById("exit")
create.addEventListener('click',() => {
    createDiv.classList.add("visible")
    document.getElementById("notepad").style.filter = "blur(2px)"
})
exit.addEventListener('click',() => {
    createDiv.classList.remove("visible")
    document.getElementById("notepad").style.filter = "none"
})
//Adding the actual notes
const submitbtn = document.getElementById("submitbtn")
submitbtn.onclick = (e) => {
  e.preventDefault()
    const title = String(document.getElementById("title").value),body = String(document.getElementById("body").value)
    const author = String(document.getElementById("Aauthor").value)
    let id = document.querySelectorAll("[id*=note]").length;id+=1
    const details = {title,body,author,id}
    if(title.length > 0 && body.length > 0 && author.length > 0){
      fetch("http://localhost:8000/Notes",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(details)
      }).then(() => {
        console.log("Added in data")
      }).catch(error => {
        console.log(error)
      })
    }
}
//Displaying the actual Notes
var xhReq = new XMLHttpRequest();
xhReq.open("GET","http://localhost:8000/Notes", false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText)

jsonObject.forEach((object,index,_) => {
    const headTitle = document.createElement('h1'),authorTitle = document.createElement('p'),bodyTitle = document.createElement('p'),noteDiv = document.getElementById("note"),innerNoteDiv = document.createElement('div')
    const editbtn = document.createElement('button'),deletebtn = document.createElement('button'),editingDiv = document.createElement('div')
    editbtn.innerText = "Edit",deletebtn.innerText = "Delete"
    editingDiv.id = "Btns"
    const editFunc = (e) => {
      const exitter = document.getElementById("exit1")
      const editsubmitter = document.getElementById("editbtn")
      const editTab = document.getElementById("edit")
      editTab.classList.add("visible")

      editsubmitter.onclick = () => {
        
        const newTitle = String(document.getElementById("titleEdit").value),newAuthor = String(document.getElementById("authorEdit").value),newBody = String(document.getElementById("bodyEdit").value)
        if(newTitle.length > 0 && newAuthor.length > 0 && newBody.length > 0){
          object.title = newTitle
          object.author = newAuthor
          object.body = newBody
          
          headTitle.innerText = object.title
          authorTitle.innerText = object.author
          bodyTitle.innerText = object.body
          const newData = {
            id:index,
            title:newTitle,
            author:newAuthor,
            body:newBody
          }
          const Data ='./db.json'
          fetch("http://localhost:8000/Notes/" + `${index}`,{
            method:"PUT",
            headers:{'Content-type':'Application/json'},
            body:JSON.stringify(newData)
          }).then(response => response).then(data => console.log(data)).catch(error => console.log(error))
        }
      }
      exitter.onclick = () => {
        editTab.classList.remove('visible')
      }
    },deleteFunc = (e) => {
            
    }
    editbtn.addEventListener('click',(e) => editFunc(e))
    deletebtn.addEventListener('click',(e) => deleteFunc(e))

    editingDiv.append(editbtn,deletebtn)
    headTitle.innerText = object.title,authorTitle.innerText = "Author: " + object.author,bodyTitle.innerText = object.body
    innerNoteDiv.id = "Note" + index
    innerNoteDiv.append(headTitle,authorTitle,bodyTitle,editingDiv)
    noteDiv.appendChild(innerNoteDiv)
})
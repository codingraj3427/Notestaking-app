console.log("Show notes");
showNotes();


let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function (e) {
    let addtext = document.getElementById("addtxt");
    let addtitle=document.getElementById("addtitle");
    let notesElement = localStorage.getItem("notes");
    if (notesElement == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesElement);
    }
    let myObj=
    {
   title:addtitle.value,
   text:addtxt.value


    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtext.value = "";
    console.log(notesObj);

    showNotes();
})



//Function to show the notes in the webpage

function showNotes() {
    let notesElement = localStorage.getItem("notes");
    if (notesElement == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesElement);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
       
       <div class="notecard my-2 mx-2 card" style="width: 18rem;">
    
                    <div class="card-body">
                      <h5 class="card-title"> ${element.title} </h5>
                      <p class="card-text">${element.text}</p>
                      <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete</button>
                    </div>
                  </div>
       
       `
    });

    let notesElm = document.getElementById("notes");
    
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html.toLowerCase();
    } 

    else{
        
        notesElm.innerHTML=`Nothing to show ! USE  "add a note" to add your note`;
        
    }


}





//funcriuon to delete a note

function deletenote(index)
{
    console.log("I am deleting the note ",index);

    let notesElement = localStorage.getItem("notes");
    if (notesElement == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesElement);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();

    
}


let search=document.getElementById("searchtxt");
search.addEventListener('input',function()
{
    let inputval=search.value.toLowerCase();
    // console.log('Input event fired',inputval);
    let notecards=document.getElementsByClassName('notecard');
    let notetitle=document.getElementsByClassName('notetitle')
    Array.from(notecards).forEach(function(element)
    {
        let cardtxt=element.getElementsByTagName("p")[0].innerText;
        let cardtitle=element.getElementsByTagName("h5")[0].innerText;
        if(cardtxt.includes(inputval))

        {
            element.style.display="block";
        }
      

        else if(cardtitle.includes(inputval))
        {
              
            element.style.display="block";

        }
        else
        {
            element.style.display="none";
        }
        // console.log(cardtxt)
    })

})
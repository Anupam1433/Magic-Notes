console.log('hey Anupam');

showNotes();


//If user add a note, add it on local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addtxt.value);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addtxt.value = "";
    // console.log(notesobj);
    showNotes();
});
// Function to showelement in notes section
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div> 
        `;
    });
    let notesElm = document.getElementById('notes');
    if( notesobj.length != 0){
       notesElm.innerHTML = html ;
    }else{
        notesElm.innerHTML = `Nothing in here? Use add note to add something`;
    }
}

//function to delete a note
function deleteNote(index){
    // console.log('i am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    showNotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    // console.log('I am fired!', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
        // console.log(cardTxt);

    });
});

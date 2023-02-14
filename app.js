// Targeting DOM Elements

let notesForm = document.getElementById("notesForm"),
notesInput = document.getElementById("notes-input"),
addNotesBtn = document.getElementById("add-note"),
notesHeading = document.getElementById("notes-heading"),
notesContainer = document.getElementById("notes-container"),
singleNoteEditBtn = document.getElementById("edit-btn"),
singleNoteDeleteBtn = document.getElementById("delete-btn"),
clearNotes= document.getElementById("clear-notes");

// Notes Storing Array
let notes = [];

// Making Functions
let inputClear = () => {
    notesInput.value = "";
}

let copyNote = (text) => {
    navigator.clipboard.writeText(text.innerHTML);
    let temp = text.innerHTML;
    text.innerHTML = "Copied"
    setTimeout(() => {text.innerHTML = temp}, 1000);
    
}

let createNote = () => {
    notesContainer.innerHTML = "";
    notes.map((singleNote, Elementindex) => {
        return(
            notesContainer.innerHTML += `
            <div class="singleNote" id="${Elementindex}">
                <p>${singleNote}</p>
                <div class="controls">
                    <div class="edit" id="edit-btn" onclick="editNote(this)">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" id="delete-btn" onclick="deleteNote(this)">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>`
        )
    });

    if(notesContainer.innerHTML == ""){
        return
    } else{
        notesHeading.classList.remove("hide");
    }

    document.querySelectorAll(".singleNote").forEach(currentNote => {
        currentNote.addEventListener("click", (e) => {
            copyNote(e.currentTarget.firstElementChild);
        })
    })
}
let collectAndShowData = () => {
    notes.push(notesInput.value);
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage
    createNote();
    inputClear();
};

let formValidation = () => {
    let regex = /^\s*$/;
    if(notesInput.value == "" || notesInput.value.match(regex)){
        return;
    }
    else{
        collectAndShowData();
    }
};

let deleteNote = (obj) => {
    obj.parentElement.parentElement.remove();
    notes.splice(obj.parentElement.parentElement.id,1);
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage

    if(notesContainer.innerHTML == ""){
        return
    } else{
        notesHeading.classList.add("hide");
    }

}

let editNote = (obj) => {
    let selectedNote = obj.parentElement.parentElement;
    notesInput.value = selectedNote.children[0].innerHTML;

    deleteNote(obj);
}

// Adding the eventListeners
notesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

clearNotes.addEventListener("click", () => {
    notesContainer.innerHTML = "";
    notes.splice(0, notes.length)
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage
    notesHeading.classList.add("hide")

});


// Retrieving Data from Local Storage at start

let retrieveData = () => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    createNote();
}

retrieveData();


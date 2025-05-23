// on page load, show the correct section based on the url parameters.

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('student');
   
    const tab = urlParams.get('tab'); // "notes" or "suggest"

    const nameHeader = document.getElementById("studentName");
    const studentOverview = document.getElementById("studentOverview");
    const notesSection = document.getElementById("notesSection");
    const suggestSection = document.getElementById("suggestSection");

    console.log("studentName:", studentName);
    console.log("tab:", tab);
    console.log("notesSection exists:", !!notesSection);
    console.log("suggestSection exists:", !!suggestSection);

    //if no student or tab is present, hide everything
    if (!studentName || !tab) {
        console.log("Missing parameters. Hiding all.");
        studentOverview.classList.add("hidden");
        notesSection.classList.add("hidden");
        suggestSection.classList.add("hidden");
        return;
    }

    //show overview and student name
    studentOverview.classList.remove("hidden");
    nameHeader.innerText = `${studentName} - Overview`;

    if (tab === "notes") {
        console.log("Showing notes section");
        notesSection.classList.remove("hidden");
        suggestSection.classList.add("hidden");
    } else if (tab === "suggest") {
        console.log("Showing suggest section");
        suggestSection.classList.remove("hidden");
        notesSection.classList.add("hidden");
    }
};
//shared function, navigate back to previous page.
function goBack() {
    window.history.back();
}

// save the chagnes.
function saveChanges() {
    // Implement saving logic if needed
    alert("Changes saved (mock)!");
}



// track currently selected student name
let currentStudent = '';

    function viewStudent(name) {
        currentStudent = name;
        document.getElementById('mainTable').classList.add('hidden');
        document.getElementById('studentOverview').classList.remove('hidden');
        // update name header.
        document.getElementById('studentName').innerText = name + " - Overview";
        document.getElementById('notesArea').value = localStorage.getItem(name + '_notes') || '';
        // load saved data from localstorage.
        document.getElementById('suggestionArea').value = localStorage.getItem(name + '_suggestions') || '';
    }

    function saveChanges() {
        const notes = document.getElementById('notesArea').value;
        const suggestions = document.getElementById('suggestionArea').value;
        localStorage.setItem(currentStudent + '_notes', notes);
        localStorage.setItem(currentStudent + '_suggestions', suggestions);
        alert('Saved!');
    }
    //return from student detail.
    function goBack() {
        document.getElementById('studentOverview').classList.add('hidden');
        document.getElementById('mainTable').classList.remove('hidden');
    }
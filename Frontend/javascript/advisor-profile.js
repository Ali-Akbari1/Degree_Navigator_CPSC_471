// this javascript file will display the advisor profile from the database,
// we need to comunicate the backend advisor-info php folder in oder to get up to date information.

let addressExists = false;
let phoneNumbers = [];
let personalEmail = "";

//f etch and display advisor profile info
window.addEventListener("DOMContentLoaded", () => {
    fetch("/Backend/PHP/advisor-info.php")
    .then(res => res.json())
    .then(data => {
        console.log(data); 
        if (data.error) return console.error(data.error);


            const p = data.profile;
            const container = document.getElementById("advisorProfileInfo");
            
            //retrieve all data for displaying later
        
            container.innerHTML = `
                <h3>${p.FirstName} ${p.LastName}</h3>
                <p><strong>Advisor ID:</strong> ${p.AdvisorID}</p>
                <p><strong>Department:</strong> ${p.Department}</p>
                <p><strong>Sex:</strong> ${p.Sex || "Not specified"}</p>
                <p><strong>Birth-date:</strong> ${p.BirthDate}</p>
                <p><strong>SIN:</strong> ***-***-${p.SIN.slice(-3)}</p>
                <p><strong>Nationality:</strong> ${p.Nationality || "Canadian"}</p>
                <p><strong>Permanent Address:</strong> ${p.Address}</p>
                <p><strong>Phone Number:</strong> ${p.PhoneNumber}</p>
            `;

            document.getElementById("uofcEmail").textContent = p.Email;
        })
        //catch any fails
        .catch(err => console.error("Failed to load advisor profile", err));
});

//  Address Logic 
function addAddress() {
    const addressInput = document.getElementById('addressInput');
    const addressDisplay = document.getElementById('addressDisplay');
    //check if you already have an address.
    if (addressExists) {
        alert("You already have an address. Delete it first to add a new one.");
        return;
    }
    //enter valid address.
    if (addressInput.value.trim() === "") {
        alert("Please enter a valid address.");
        return;
    }

    addressDisplay.innerText = addressInput.value;
    addressExists = true;

    //add delete button
    addressDisplay.innerHTML += ` <button onclick="deleteAddress()">Delete</button>`;
    addressInput.value = "";
}

function deleteAddress() {
    document.getElementById('addressDisplay').innerText = "-";
    addressExists = false;
}

// same thing but with Phone Logic ---
function addPhone() {
    const phoneInput = document.getElementById('phoneInput');
    const phoneList = document.getElementById('phoneList');
    const phone = phoneInput.value.trim();

    if (!phone) {
        alert("Enter a valid phone number.");
        return;
    }

    if (phoneNumbers.length >= 1) {
        alert("Maximum 1 alternative phone number is allowed.");
        return;
    }

    phoneNumbers.push(phone);

    const li = document.createElement('li');
    li.innerHTML = `${phone} <button onclick="removePhone(this, '${phone}')">Delete</button>`;
    phoneList.appendChild(li);

    phoneInput.value = "";
}

function removePhone(btn, phone) {
    phoneNumbers = phoneNumbers.filter(p => p !== phone);
    btn.parentElement.remove();
}

// same as above, Email Logic ---
function updateEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    const personalEmailSpan = document.getElementById('personalEmail');

    if (!email || !email.includes('@') || email.endsWith('@ucalgary.ca')) {
        alert("Enter a valid personal (non-UofC) email.");
        return;
    }

    personalEmail = email;
    personalEmailSpan.innerHTML = `${email} <button onclick="clearPersonalEmail()">Delete</button>`;
    emailInput.value = "";
}

function clearPersonalEmail() {
    personalEmail = "";
    document.getElementById('personalEmail').innerText = "-";
}

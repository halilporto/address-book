//Variables

var name;
surname;
country;
city;
email;
phone;
var myListArea = $(".my-list");
var data = [];


//Check if my Local Storage is Empty or Not
window.onload = function () {
    if (localStorage["info"] === undefined) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("info"));
        clearInfo();
        callInfo();
    }
};


// On Click Save Button
$("#save-entry").on("click", function () {
    name = $("#name").val();
    surname = $("#surname").val();
    country = $("#country").val();
    city = $("#city").val();
    email = $("#email").val();
    phone = $("#phone").val();

    var isNotEmpty = name != "" && surname != "" && country != "" && city != "" && email != "" && phone != "";

    if (isNotEmpty) {
        newEntry();
        updatels();
        $("#name").val("");
        $("#surname").val("");
        $("#country").val("");
        $("#city").val("");
        $("#email").val("");
        $("#phone").val("");
    } else {
        alert("missing entries");
    };
});

// Function for new entry to the array
function newEntry() {
    var entry = {
        'name': name,
        'surname': surname,
        'country': country,
        'city': city,
        'phone': phone,
        'email': email
    }
    data.push(entry);
    updatels();
    clearInfo();
    callInfo();
};

// Function for updating localStorage

function updatels() {
    localStorage.setItem("info", JSON.stringify(data));
};

// Function for calling data to table
function callInfo() {
    var myData = JSON.parse(localStorage.getItem("info"));

    for (let i in myData) {
        myListArea.append(
            `<tr class="input-row">
        <td>${myData[i].name}</td>
        <td>${myData[i].surname}</td>
        <td>${myData[i].country}</td>
        <td>${myData[i].city}</td>
        <td>${myData[i].email}</td>
        <td>${myData[i].phone}</td>
        <td class="deneme"><button id="delete-entry" data-id= "` + i + `">Delete</button></td>
        </tr>`
        )
    }
};

//Clear Table before generation
function clearInfo() {
    $(".input-row").remove();
};

//Function for deleting an entry

$(document).on('click', '#delete-entry', function (e) {
    confirm("Do you want to delete this entry?");
    var t = e.target.getAttribute("data-id");
    data.splice(t,1);
    updatels();
    clearInfo();
    callInfo();
});
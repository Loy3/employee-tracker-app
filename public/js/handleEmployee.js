//Delete function
function deleteEmp(employee) {
    const empDelete = JSON.parse(employee)
    // console.log(empDelete);

    const endPoint = `/delete/${empDelete.id}`;
    fetch(endPoint, {
        method: "DELETE",
    }).then(() => {
        console.log("Employee Deleted.");
    }).catch((error) => {
        console.log(error);
    })

    const imgEndPoint = `/delete-image/${empDelete.empImage}`;
    fetch(imgEndPoint, {
        method: "DELETE",
    }).then(() => {
        console.log("Image Deleted.");
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    })
}

//Update Functions
var empToUpdate = [];
function openUpdate(employee) {
    empToUpdate = JSON.parse(employee);
    document.getElementById("update").style.display = "block";
    console.log(empToUpdate);

    document.getElementById("fName").innerHTML = `${empToUpdate.empName} ${empToUpdate.empSurname}`;
    document.getElementById("idNum").innerHTML = empToUpdate.empIdNumber;
    document.getElementById("emailA").innerHTML = empToUpdate.empEmailAddress;
    document.getElementById("phNum").innerHTML = empToUpdate.empPhoneNumber;
    document.getElementById("pstn").innerHTML = empToUpdate.empPosition;

    let img = document.getElementById("empImg");
    img.src = empToUpdate.empImage;

}

function close_form() {
    document.getElementById("update").style.display = "none";
    let updateF = document.getElementById("update-form");
    let viewEmp = document.getElementById("view");
    // let img = document.getElementById("empImg");
    viewEmp.style.display = "block";
    updateF.style.display = "none";
    // img.style.height = "40vh";
}

function viewOrUpdate(value) {
    let updateF = document.getElementById("update-form");
    let viewEmp = document.getElementById("view");
    // let img = document.getElementById("empImg");
    switch (value) {
        case 1:
            viewEmp.style.display = "block";
            updateF.style.display = "none";
            // img.style.height = "40vh";
            break;

        case 2:
            viewEmp.style.display = "none";
            updateF.style.display = "block";
            // img.style.height = "20vh";


            document.getElementById("title").innerHTML = `Update for: ${empToUpdate.empName} ${empToUpdate.empSurname}`;
            document.getElementById("empName").placeholder = `Name: ${empToUpdate.empName}`;
            document.getElementById("empSurname").placeholder = `Surname: ${empToUpdate.empSurname}`;
            document.getElementById("empIdNumber").placeholder = `ID Number: ${empToUpdate.empIdNumber}`;
            document.getElementById("empEmailAddress").placeholder = `Email: ${empToUpdate.empEmailAddress}`;
            document.getElementById("empPhoneNumber").placeholder = `Phone Number: ${empToUpdate.empPhoneNumber}`;
            // document.getElementById("position").innerHTML = `Current Position: ${empToUpdate.empPosition}`;
            break;
    }

}

function changeEntries(type) {
    switch (type) {
        case 1:
            document.getElementById("upDetails").style.display = "block";
            document.getElementById("upImg").style.display = "none";
            break;
        case 2:
            document.getElementById("upDetails").style.display = "none";
            document.getElementById("upImg").style.display = "block";
            break;
        default:

    }
}

function updateDoc() {
    let name = document.getElementById("empName").value;
    let surname = document.getElementById("empSurname").value;
    let idNum = document.getElementById("empIdNumber").value;
    let email = document.getElementById("empEmailAddress").value;
    let phNum = document.getElementById("empPhoneNumber").value;
    let position = document.getElementById("empPosition").value;
    // let img = document.getElementById("empImage").files[0];

    // console.log(img);

    if (name === "") {
        name = empToUpdate.empName;
    }
    if (surname === "") {
        surname = empToUpdate.empSurname;
    }
    if (idNum === "") {
        idNum = empToUpdate.empIdNumber;
    }
    if (email === "") {
        email = empToUpdate.empEmailAddress;
    }
    if (phNum === "") {
        phNum = empToUpdate.empPhoneNumber;
    }
    if (position === "Select Position") {
        position = empToUpdate.empPosition;
    }

    const formData = new FormData();
    formData.append('empName', name);
    formData.append('empSurname', surname);
    formData.append('empIdNumber', idNum);
    formData.append('empEmailAddress', email);
    formData.append('empPhoneNumber', phNum);
    formData.append('empPosition', position);
    formData.append('empImage', empToUpdate.empImage);

   
    const endPoint = `/update/${empToUpdate.id}`;

    fetch(endPoint, {
        method: "PUT",
        // headers: { 'ContentType': 'application/json' },
        body: formData
    }).then(response => response.json()).then((dat) => {
        console.log("Done: ", dat);
    }).catch((error) => {
        console.log(error);
    })

    window.location.reload();
}


function updateImage(){
    let img = document.getElementById("empImage").files[0];
    const formData = new FormData();
    formData.append('empName', empToUpdate.empName);
    formData.append('empSurname', empToUpdate.empSurname);
    formData.append('empIdNumber', empToUpdate.empIdNumber);
    formData.append('empEmailAddress', empToUpdate.empEmailAddress);
    formData.append('empPhoneNumber', empToUpdate.empPhoneNumber);
    formData.append('empPosition', empToUpdate.empPosition);
    formData.append('empImage', img);

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
    const endPoint = `/updateImage/${empToUpdate.id}`;

    fetch(endPoint, {
        method: "PUT",
        body: formData
    }).then(response => response.json()).then((dat) => {
        console.log("Done: ", dat);
    }).catch((error) => {
        console.log(error);
    })

    const imgEndPoint = `/delete-image/${empToUpdate.empImage}`;
    fetch(imgEndPoint, {
        method: "DELETE",
    }).then(() => {
        console.log("Image Deleted.");
        // window.location.reload();
    }).catch((error) => {
        console.log(error);
    })
    window.location.reload();
}


//Search
function search(employees) {
    const email = document.getElementById("search").value;
    const myEmployees = JSON.parse(employees)
    console.log(myEmployees);
    for (let i = 0; i < myEmployees.length; i++) {
        if (email === myEmployees[i].empEmailAddress) {
            empToUpdate = myEmployees[i];
            document.getElementById("update").style.display = "block";
            console.log(empToUpdate);
        }
    }

    document.getElementById("fName").innerHTML = `${empToUpdate.empName} ${empToUpdate.empSurname}`;
    document.getElementById("idNum").innerHTML = empToUpdate.empIdNumber;
    document.getElementById("emailA").innerHTML = empToUpdate.empEmailAddress;
    document.getElementById("phNum").innerHTML = empToUpdate.empPhoneNumber;
    document.getElementById("pstn").innerHTML = empToUpdate.empPosition;

    let img = document.getElementById("empImg");
    img.src = empToUpdate.empImage;


}
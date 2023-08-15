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
    let img = document.getElementById("empImg");
    viewEmp.style.display = "block";
    updateF.style.display = "none";
    img.style.height = "40vh";
}

function viewOrUpdate(value) {
    let updateF = document.getElementById("update-form");
    let viewEmp = document.getElementById("view");
    let img = document.getElementById("empImg");
    switch (value) {
        case 1:
            viewEmp.style.display = "block";
            updateF.style.display = "none";
            img.style.height = "40vh";
            break;

        case 2:
            viewEmp.style.display = "none";
            updateF.style.display = "block";
            img.style.height = "20vh";


            document.getElementById("title").innerHTML = `Update for: ${empToUpdate.empName} ${empToUpdate.empSurname}`;
            document.getElementById("empName").placeholder = `Name: ${empToUpdate.empName}`;
            document.getElementById("empSurname").placeholder = `Surname: ${empToUpdate.empSurname}`;
            document.getElementById("empIdNumber").placeholder = `ID Number: ${empToUpdate.empIdNumber}`;
            document.getElementById("empEmailAddress").placeholder = `Email: ${empToUpdate.empEmailAddress}`;
            document.getElementById("empPhoneNumber").placeholder = `Phone Number: ${empToUpdate.empPhoneNumber}`;
            document.getElementById("position").innerHTML = `Current Position: ${empToUpdate.empPosition}`;
            break;
    }

}

function updateDoc() {


    let name = document.getElementById("empName").value
    let surname = document.getElementById("empSurname").value
    let idNum = document.getElementById("empIdNumber").value
    let email = document.getElementById("empEmailAddress").value
    let phNum = document.getElementById("empPhoneNumber").value
    let position = document.getElementById("empPosition").value

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
    if (position === "") {
        position = empToUpdate.empPosition;
    }

    const dataToUp = {
        empName: name,
        empSurname: surname,
        empIdNumber: idNum,
        empEmailAddress: email,
        empPhoneNumber: phNum,
        empPosition: position,
        empImage: empToUpdate.empImage
    }
    const endPoint = `/update/${empToUpdate.id}`;

    fetch(endPoint, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUp)
    }).then(response => response.json()).then((dat) => {
        console.log("Done: ", dat);
    }).catch((error) => {
        console.log(error);
    })

    window.location.reload();
}



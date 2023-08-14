// //Delete function
// function deleteEmp(employee) {
//     const empDelete = JSON.parse(employee)
//     // console.log(empDelete);

//     const endPoint = `/deleteEmp/${empDelete.id}`;
//     fetch(endPoint, {
//         method: "DELETE",
//         body:  JSON.stringify(empDelete)
//     }).then(() => {
//             console.log("Deleted.");
//         }).catch((error) => {
//             console.log(error);
//         })
// }
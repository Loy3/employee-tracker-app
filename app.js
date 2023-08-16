const express = require("express");
const morgan = require("morgan");
const multer = require('multer');
const fs = require('fs');
const path = require("path");
const app = express();
const PORT = 8000;

const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
} = require("firebase/storage");
const fbStorage = require("./firebase-config.js");

//setting view engine to ejs
app.set("view engine", "ejs");


//connecting db with app
const admin = require("firebase-admin");
const credentials = require("./key.json");


//initialize admin
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
const db = admin.firestore();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));

// Add new employee
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });
app.post('/add_new_employee', upload.single('empImage'), async (req, res) => {
    console.log(req.file.filename);
    try {
        const empData = {
            empIdNumber: req.body.empIdNumber,
            empName: req.body.empName,
            empSurname: req.body.empSurname,
            empEmailAddress: req.body.empEmailAddress,
            empPosition: req.body.empPosition,
            empPhoneNumber: req.body.empPhoneNumber,
            empImage: req.file.filename
        }

        // const file = req.file;
        // const imageRef = ref(fbStorage, file.originalname);
        // const metatype = { contentType: file.mimetype, name: file.originalname };
        // await uploadBytes(imageRef, file.buffer, metatype)
        //     .then((snapshot) => {
        //         res.send("uploaded!");
        //     })
        //     .catch((error) => console.log(error.message));

        const response = await db.collection("employees").add(empData).then(() => {
            res.redirect("/");
        })
        res.send(response);

    } catch (error) {
        res.send(error)
    }
});

app.get("/add", async (req, res) => {
    res.render('partials/add_new_employee')
})



//Get
app.get("/", async (req, res) => {
    try {
        const empRef = db.collection("employees");
        const response = await empRef.get();
        let employees = [];

        response.forEach((results) => {
            employees.push({
                ...results.data(),
                // image: img,
                id: results.id
            })
        })

        res.render('partials/index', {
            employees: employees
        })
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

//Delete 
app.delete("/delete/:id", async (req, res) => {
    try {
        const deleteRef = await db.collection("employees").doc(req.params.id).delete();
        res.send(deleteRef);
        console.log("Employee Deleted");

    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

app.delete('/delete-image/:empImage', (req, res) => {
    const imgToDelete = req.params.empImage;
    const imgPath = path.join(__dirname, 'uploads', imgToDelete);
    fs.unlink(imgPath, (error) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error deleting image');
        } else {
            res.send('Image deleted successfully');
        }
    });
});

//Update 
app.put("/update/:id", upload.single('empImage'), async (req, res) => {

    const id = req.params.id;
    const updateData = {
        empName: req.body.empName,
        empSurname: req.body.empSurname,
        empIdNumber: req.body.empIdNumber,
        empEmailAddress: req.body.empEmailAddress,
        empPhoneNumber: req.body.empPhoneNumber,
        empPosition: req.body.empPosition,
        empImage: req.body.empImage

    }

    await db.collection("employees").doc(id).update(updateData).then(() => {
    }).catch((error) => {
        console.log(error);
        res.send(error)
    })


})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload2 = multer({ storage: storage2 });
app.put("/updateImage/:id", upload2.single('empImage'), async (req, res) => {

    const id = req.params.id;
    // console.log(req.body.empImage);
    const updateData = {
        empName: req.body.empName,
        empSurname: req.body.empSurname,
        empIdNumber: req.body.empIdNumber,
        empEmailAddress: req.body.empEmailAddress,
        empPhoneNumber: req.body.empPhoneNumber,
        empPosition: req.body.empPosition,
        empImage: req.file.filename
    }

    await db.collection("employees").doc(id).update(updateData).then(() => {
        res.redirect("/");
        // window.location.reload();
    }).catch((error) => {
        console.log(error);
        res.send(error)
    })


})

app.use(function (req, res, next) {
    res.render("partials/404");
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
})
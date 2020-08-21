const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Requester = require("./models/Requester");
const mongoose = require("mongoose")
const validator = require("validator")

const app = express()
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', (req,res)=>{
    res.render('register.ejs', { err: [], data: null });
})

mongoose.connect("mongodb+srv://sergei:Deakin2020@cluster0.t3ayv.mongodb.net/iCrowdTaskDB?retryWrites=true&w=majority", {useNewUrlParser: true})

app.post('/', (req,res)=>{
    const requester = new Requester({
        country: req.body.country,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        mobile: req.body.mobile
    });

    requester.save()
        .catch((err) => res.render('register.ejs', { err: err, data: requester }));

if (res.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html")
        }
        else 
        {
            res.sendFile(__dirname + "/404.html")
        }

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen(port, (req,res)=>{
    console.log("Server is running successfully!")
})
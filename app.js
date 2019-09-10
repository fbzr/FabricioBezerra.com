const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodeMailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => res.render("home"));

app.post("/contact", (req,res) => {
    // let name = req.body.name;
    // let email = req.body.email;
    // let message = req.body.message;
  
    // const output = '<p>You have a new message from FabricioBezerra.com</p><h3>Contact Details</h3><ul><li>Name: ' + name + '</li><li>Email: ' + email + '</li></ul><h3>Message:</h3><p>' + message + '</p>';
  
    // let transporter = nodeMailer.createTransport({
    //   host: 'smtp.office365.com', // Office 365 server
    //   port: 587, // secure SMTP
    //   secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASS
    //   },
    //   tls: {
    //     ciphers: 'SSLv3'
    //   }
    // });
  
    // let mailOptions = {
    //   from: '"Contact - FabricioBezerra.com" <contact@fabriciobezerra.com>', // sender address
    //   to: "fabricio.spb@gmail.com, contact@fabriciobezerra.com", // list of receivers
    //   subject: "Message from FabricioBezerra.com", // Subject line
    //   text: message, // plain text body
    //   html: output // html body
    // };
  
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     res.send("Error: " + error);
    //   } else {
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    //   }
    // });
    console.log("email sent");
});

let port = process.env.PORT;
if (port == null) {
    port = 3000;
}

app.listen(port, () => console.log(`Server started on port ${port}`));
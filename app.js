const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodeMailer = require("nodemailer");
require("dotenv").config();
const axios = require('axios');
const { check, validationResult } = require("express-validator");

const app = express();

app.set("view engine", "ejs");
app.use(express.json({ extended: false }));
app.use(express.static("public"));


app.get("/", (req,res) => {
  res.render("home")
});

app.post(
  "/contact",
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('message', 'Please include your message').notEmpty()
  ],
  async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({ errors: errors.array() });
    }

    if(
      req.body.token === undefined ||
      req.body.token === '' ||
      req.body.token === null
    ) {
      return res.status(401).json({ 
        errors: [{
          msg: 'No recaptcha token'
        }] 
      })
    }

    const { name, email, message, token } = req.body; 

    // Google Recaptcha
    const recaptcha = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}&remoteip=${req.connection.remoteAddress}`, 
      {}, 
      {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }
      }
    );
    
    if (recaptcha.data.success == false || recaptcha.data.score < 0.5) {
      return res.status(401).json({ 
        errors: [{
          msg: 'Sorry, your message was detected as spam'
        }] 
      })
    }
    
    // Node Mailer
    const output = '<p>You have a new message from FabricioBezerra.com</p><h3>Contact Details</h3><ul><li>Name: ' + name + '</li><li>Email: ' + email + '</li></ul><h3>Message:</h3><p>' + message + '</p>';
    let transporter = nodeMailer.createTransport({
      host: 'smtp.office365.com', // Office 365 server
      port: 587, // secure SMTP
      secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
  
    let mailOptions = {
      from: '"Contact - FabricioBezerra.com" <contact@fabriciobezerra.com>', // sender address
      to: "fabricio.spb@gmail.com, contact@fabriciobezerra.com", // list of receivers
      subject: "Message from FabricioBezerra.com", // Subject line
      text: message, // plain text body
      html: output // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ 
          errors: [{ 
            msg: "Error sending the email",
            error: error
          }] 
        });
      } 
    });

    res.status(200).json({ msg: "Thank you for conctacting me. I'll be in touch soon." });
});

let port = process.env.PORT;
if (port == null) {
    port = 3000;
}

app.listen(port, (err) => {
  if (err) console.error(err.message);
  console.log(`Server started on port ${port}`)
});
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const nodemailer = require('nodemailer')
const authenticate = require("../middleware/authenticate")
var cookieParser = require('cookie-parser')

require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser());


router.get("/", (req, res) => {
  res.send(`Hello world im from router`);
  console.log(`cookies`,req.cookies)
});

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "plz enter detail properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User register successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials pass" });
      } else {
        // const payload = {
        //   email: userLogin.email,
        //   phone: userLogin.phone,
        // };
        // console.log(userLogin);
        // res.json(payload);
        res.send({msg: "user signin successfully"})
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post("/nodemailer", async(req,res) => {
//   const {email} = req.body
//   let testAccount = await nodemailer.createTestAccount();
//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user:'pete.okeefe@ethereal.email', // generated ethereal user
//       pass: 'Tc9Y1Z1GtbgjfNUgTs', // generated ethereal password
//     },
//   });
//   const msg = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: `${email}`, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "This msg is from ....", // plain text body
//     html: "<b>Hello Swapnil</b>", // html body
//   }
//   // send mail with defined transport object
//   const info = await transporter.sendMail(msg);

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//   res.send(`Email sent`)
// }
// )

router.get('/about',authenticate, (req, res) =>{
  res.send(req.rootUser)
});

module.exports = router;

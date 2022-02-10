const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express();
const Orders = require('./db/orders')
require('./db/config');

app.use(cors())
app.use(express.json())

app.post('/mail', async (req, res) => {
    let orders = new Orders(req.body);
    let result = await orders.save();
    let email = result.email;
    // let date =res.sendDate();

    
    res.send(result)
    console.log(result)
    console.log(email)

    // Mail starts ..


    let transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'Admin EmailId',
            pass: 'password'
        }
    });

    let mailOption = {
        from: 'Admin EmailId',
        to: 'Company EmailId',
        subject: 'New Enquiry / Booking ',
        text:`Name : ${result.name} \nCity : ${result.city} \nEvent Name : ${result.ename} \nEmail_Id : ${email} \nDate of Event : ${result.date} \nContact Number : ${result.contact} \n `,
       
    }
    transpoter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("email send succesfully ", info.response)
        }

    })


})
app.get('/data',async(req,res)=>{

    let result =  await Orders.find()
    res.send(result);
})


app.delete('/delete/:id',async(req,res)=>{

    let result = await Orders.deleteOne({_id:req.params.id})
    res.send(result)
    console.log(result)
})

app.post('/done/:id',async(req,res)=>{

    let result = await Orders.findOne({_id:req.params.id})
    res.send(result)
    console.log(result.name)
  
    let transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'Email_Id',
            pass: 'Password'
        }
    });

    let mailOption = {
        from: 'From Email_id',
        to: result.email,
        subject: 'Response Your Booking ',
        text:   `Hello ${result.name},

        Thank you for your interest in Shri Decorations.
        We Recived your Enquiry , Our Team will contact you As Eearly as Possible.
        We will get More Information from you about Event
        
        Thank you again for reaching out. Wishing you Have a great day !
        
        Best Wishes,
        Shri Decoration Team
        Contact: +91-0000000000  `,
       
    }
    transpoter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("email send succesfully ", info.response)
        }

    })

})
app.listen(5000)
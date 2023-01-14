const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const FirstName = req.body.Fname;
    const LastName = req.body.Lname;
    const Email = req.body.email;


    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                },
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/acf4747481";

    const option = {
        method: "POST",
        auth: "Pratik1:659862a419e8b2232aaafc97e932557e-us21"
    }

    const request = https.request(url, option, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            // console.log(JSON.parse(data));
            console.log("Data is stored at Mailchimp server.");
        })
    })

    request.write(jsonData);
    request.end();
    // console.log(FirstName + "  " + LastName + "  " + Email);
})


app.post("/failure", function (req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening port number : 3000");
})


// Appikey -> 659862a419e8b2232aaafc97e932557e-us21
// Uniqueid -> acf4747481
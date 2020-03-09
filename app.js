const axios = require("axios");
const express = require("express");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));


const newData = [];

axios.get('https://ecell.nitrr.ac.in/events/list/2019/?format=json')
    .then(function(response) {
        if (response.status === 200) {
            data = response.data.data;
            for (let i = 0; i < data.length; i++) {
                newData.push(data[i]);
            }
        } else {
            console.log("Error in Fetching Data");
        }
    }).catch(function(error) {
        console.log(error);
    });

app.get('/', function(req, res) {
    res.render("index", { pdata: newData });

})

app.get('/events/:id', function(req, res) {

    const required_id = req.params.id;


    newData.forEach(function(new_id) {
        const storedId = new_id.id;

        if (storedId == required_id) {
            res.render("events", { postData: new_id });
        }
    });
});



app.get("/goback", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server started on port 3000")
});
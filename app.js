//Server: Set up Server and its port

const express = require('express');
const app = express();
const port = 3000;

//View engine : Set up ejs as this project's view engine
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static("public"))

//dataBase: - save what is posted to the databse
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://krit:test1234@cluster0.e2egm.mongodb.net/toDoListDB?retryWrites=true&w=majority');

//Schema and model(collections) for this project
const itemSchema = {
  itemName: String,
};

const Item = mongoose.model(
  'Item',
  itemSchema
);


//Other dependencies
  //Body-parser - access what is posted
const bodyParser = require('body-parser');
  //Body-parser setup
app.use(bodyParser.urlencoded({ extended: false}));


//set up routes
  //Home Route
app.get('/', (req, res) => {

  Item.find((err, items) => {
    if (err) {
      console.log(err);
    } else if(items.length === 0) {
      const newItem = new Item ({
        itemName : "<-- Click this checkbox to delete a finished task!"
      }) ;
      newItem.save( (err, newItem) => {
        if(err){
          console.log(err);
        }});
        const newItem2 = new Item ({
          itemName : "Add a new task down below!"
        }) ;
        newItem2.save( (err, newItem2) => {
          if(err){
            console.log(err);
          }});


      res.redirect("/");
    }
     else {
        res.render("home", {items : items });
    }

    });
  });


app.post('/', (req, res) => {
  const newItem = new Item ({
    itemName : req.body.newItem
  }) ;

  newItem.save( (err, newItem) => {
    if(err){
      console.log(err);
    }});

  res.redirect("/");

});


app.post('/delete', (req, res) => {
  Item.findOneAndRemove({itemName: req.body.checkbox}, function(err){});
  res.redirect("/");
})









// Server : Connect server to the port
app.listen(port, () => {
  console.log("Sucessfully connected!");
});

const mongoose = require("mongoose");

// Import Recipe model
const Recipe = require("./models/Recipe");

// Import data
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipeApp";

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.create({
      title: "Veggie Lasagna",
      level: "Amateur Chef",
      ingredients: ["pasta", "tomato sauce", "vegetables", "cream"],
      cuisine: "Italian",
      dishType: "Dish",
      image:
        "https://www.inspiredtaste.net/wp-content/uploads/2016/10/Easy-Vegetable-Lasagna-Recipe-1200.jpg",
      duration: 60,
      creator: "Luigi"
    })
      .then(createdRecipe => {
        console.log("We successfully created a recipe.");
        // console.log(createdRecipe);
        console.log(createdRecipe.title);
        return Recipe.insertMany(data);
      })
      .then(recipeArray => {
        console.log(
          "We successfully added the array of recipes to the database."
        );
        for (i = 0; i < recipeArray.length; i++) {
          console.log(recipeArray[i].title);
        }
        console.log(recipeArray);
        
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 110 });
      })
      .then(changedTitledDocument => {
        console.log(changedTitledDocument);
        console.log('Success! Changed the duration of the Rigatoni alla Genovese recipe.');
        return Recipe.deleteOne({ title: 'Carrot Cake' });
      })
      .then(deletedRecipeDocument => {
        console.log(deletedRecipeDocument);
        console.log('Success! Deleted the Carrot Cake recipe.');
        
      })
      .catch(error => {
        console.log("There was an error in the chain of operations.");
        console.log(error);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

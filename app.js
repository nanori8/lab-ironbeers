const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// get all beers
app.get('/beers', (request, response) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    response.render('beers', {beersFromApi })}
  )
  .catch(error => {
    // console.log(error);
    response.send('There was an error processing your request.');}
    );
});

// get random beers
app.get('/random-beer', (request, response) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    let randomBeer = responseFromAPI[0];
    console.log('Random beers: ', randomBeer )
    response.render('random-beer', { randomBeer})}
  )
  .catch(error => {
    console.log(error);
    response.send('There was an error processing your request.');}
    );
});

app.get('/:id', (request, response) => {
  const id = request.params.id;
  axios
    .getBeer(id)
    .then(result => {
      const beer = result.data;
      response.render('single', { beer });
    })
    .catch(error => {
      console.log('There was an error loading response from api');
      console.log(error);
      response.send('There was an error processing your request.');
    });
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));


const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const jsonfile = require('jsonfile');

// Initialise postgres client
const configs = {
  user: 'wenyaolee',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  //jsonfile.readFile()

  const queryString = 'SELECT * from pokemon'

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('query error:', err.stack);
    } else {
      console.log('query result:', result);

      //redirect to home page
      //response.send( result );
      let content = {
        pokedex : result.rows
      }
      response.render('Home', content);
    }
  });

});

app.get('/pokemon/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('New');
});

app.get('/pokemon/:id', (request, response) => {
  let pokemonId = parseInt(request.params['id']);
  //let pokemonName = request.params['name'];
  //console.log(typeof userIdInput);
  
  const queryString = 'SELECT * from pokemon WHERE id = $1';
  let values = [pokemonId];
  pool.query(queryString, values, (err, result) => {

    let contentTwo = {
      pokedex : result.rows[0]
    }    
    response.render('Find', contentTwo);
    //response.send(result.rows[0]);

});
});


app.post('/pokemons', (request, response) => {

  let newPokeId = parseInt(request.body['id']);
  let newPokeNum = request.body['num'];
  let newPokeName = request.body['name'];
  let newPokeImg = request.body['img'];
  let newPokeHeight = request.body['height'];
  let newPokeWeight = request.body['weight'];

  const queryString = 'INSERT INTO pokemon(id, num, name, img, height, weight) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [newPokeId, newPokeNum, newPokeName, newPokeImg, newPokeHeight, newPokeWeight];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
});

app.get('/pokemons/edit/:id', (request, response) => {

  let pokeId = parseInt(request.params['id']);
  const queryString = 'SELECT * from pokemon WHERE id = $1';
  let values = [pokeId];
  pool.query(queryString, values, (err, result) => {

    let contentThree = {
      pokedex : result.rows[0]
    }    
    response.render('Edit', contentThree);
});
});

app.put('/pokemons/edit/:id', (request, response) => {

  let updatedPokeId = request.body['id'];
  let updatedPokeNum = request.body['num'];
  let updatedPokeName = request.body['name'];
  let updatedPokeImg = request.body['img'];
  let updatedPokeHeight = request.body['height'];
  let updatedPokeWeight = request.body['weight'];

  const queryString = 'UDPATE pokemon SET id='+updatedPokeId+', name='+updatedPokeName+', img='+updatedPokeImg+', height='+updatedPokeHeight+', weight='+updatedPokeWeight;

  pool.query(queryString, (err, result) => {
    if(err){
      console.log('edit query error:', err.stack);
    } else {
      console.log('edit query result: ', result);
    }

    response.redirect('/pokemon/'+request.params['id']);
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

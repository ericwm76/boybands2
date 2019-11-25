// Bring in Express, which is a middleware 
const express = require('express');
// Bring in CORS, which allows the server to share data with domains that are not the origin
const cors = require('cors');
// Creates an App object with all the methods available to it
const app = express();
// Sets the environment to whatever is specified in the configuration file; if none is specified, then defaults to 'development'
const environment = process.env.NODE_ENV || 'development';
// Sets the configuration to whatever the environment is (development by default, but could also be production)
const configuration = require('./knexfile')[environment];
// Sets the database to be either the development database or the production database (since those are the only two environments set up in the knexfile.js)
const database = require('knex')(configuration);

// Creates a Locals storage object with a property 'title' whose value is 'Boy Bands...'
app.locals.title = 'Boy Bands and Their Members Since 1980';
// App uses express.json middleware, which parses requests received into JSON
app.use(express.json());
// Invokes the CORS method, which allows for cross-origin resource sharing
app.use(cors());
// Sets the port to whatever is specified in the process file (?), or to 3000 if none is specified.
app.set('port', process.env.PORT || 3000);


// Creates an endpoint for a GET request at the '/api/v1/bands' route
app.get('/api/v1/bands', (request, response) => {
  // Choose which data table to get data from in the database
  database('bands').select()
  // Once the data has been selected, run a callback function on each row of data
  .then((bands) => {
    // send back a response status code of 200, along with a JSON object containing that row's data
    response.status(200).json(bands);
  })
  // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
  .catch((error) => {
    response.status(500).json({ error });
  });
});

// Creates an endpoint for a GET request at the '/api/v1/members' route. 
app.get('/api/v1/members', (request, response) => {
  // Choose which data table to get data from in the database
  database('bandMembers').select()
  // Once the data has been selected, run a callback function on each row of data
  .then((members) => {
    // send back a response status code of 200, along with a JSON object containing that row's data
    response.status(200).json(members);
  })
  // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
  .catch((error) => {
    response.status(500).json({ error })
  });
});

// Creates an endpoint for a GET request for a specific band at the '/api/v1/bands/:id' route, where the :id can be swapped in for a band's id number
app.get('/api/v1/bands/:id', (request, response) => {
  // Deconstructs the id property from the request's params object and sets it to a constant
  const { id } = request.params;

  // Select everything from the 'bands' data table where the id number matches the id passed in by the request params
  database('bands').where({ id: id })
  // Run a callback function on each row of data returned (should only be one)
    .then(band => {
      // If nothing in the data table matches the requested id number, 
      if (band.length === 0) {
        // Send back a 404 error with a JSON object, with a key of 'error' and a value of the error message.
        response.status(404).json({ error: `There is not a boy band with an id of ${id}!` });
      }
      // Otherwise, send back a 200 status code (ok) and a json object with the band's data (has to be at index 0 because the data is always returned as an array, even if there's only one)
      response.status(200).json(band[0]);
    })
    // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
    .catch(error => {
      response.status(500).json({ error });
    });
});

// Creates an endpoint for a GET request for a specific band member at the '/api/v1/members/:id' route, where the :id can be swapped in for a member's id number
app.get('/api/v1/members/:id', (request, response) => {
  // Deconstructs the id property from the request's params object and sets it to a constant
  const { id } = request.params;
  // Select everything from the 'bandMembers' data table where the id number matches the id passed in by the request params
  database('bandMembers').where({ id: id })
    // Run a callback function on each row of data returned (should only be one)
    .then(member => {
      // If nothing in the data table matches the requested id number, 
      if (member.length === 0) {
        // Send back a 404 error with a JSON object, with a key of 'error' and a value of the error message.
        response.status(404).json({ error: `There is not a boy band member with an id of ${id}!` });
      }
      // Otherwise, send back a 200 status code (ok) and a json object with the band member's data
      response.status(200).json(member[0]);
    })
    // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
    .catch(error => {
      response.status(500).json({ error });
    });
});

// Creates an endpoint for a DELETE request for a specific band member at the '/api/v1/members/:id' route
app.delete('/api/v1/members/:id', (request, response) => {
  // Deconstructs the id property from the request's params object and sets it to a constant
  const { id } = request.params;
  // Select everything from the 'bandMembers' data table where the id number matches the id passed in by the request params, and delete it from the database
  database('bandMembers').where({ id: id }).select().del()
    // Run a callback function on the response, which is the number of rows deleted
    .then(r => {
      // If there were no rows deleted, send back a 404 error indicating that the band member was not found.
      if (r === 0) {
        response.status(404).json({ error: `There is not a boy band member with an id of ${id}!` });
      }
      // Otherwise, send back a status code of 200 and a message indicating that the band member was deleted.
      response.status(200).json(`Boy band member ${id} successfully deleted!`)
    })
    // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
    .catch(error => {
      response.status(500).json({ error })
    })
})

// Creates an endpoint for a POST request to add a new band member to the database at the '/api/v1/members/:id' route
app.post('/api/v1/members', (request, response) => {
  // Declare a variable called 'member' and assign it to the value of the request body (i.e., the object containing the member's data)
  const member = request.body;

  // Creates a for... of loop which iterates over each element in an iterable (in this case, an array)
  for (let requiredParam of ['name', 'band_name']) {
    // If either member.name or member.band_name doesn't exist,
    if (!member[requiredParam]) {
      // Return a 422 status code, along with an error message reminding the user what format the request body requires
      return response.status(422).send({ error: `Expected format: {
        name: <String>,
        band_name: <String>,
        dob: <String>,
        hair_color: <String>,
        hair_frosted: <String>,
        hair_style: <String>,
        eyes: <String>,
        facial_hair: <String>,
        accessories: <String>,
        top_style: <String>,
        bottom_style: <String>,
        instrument: <String>
      }
      
      At least name and band_name are required. You're missing ${requiredParam}.`})
    }
  }
  // Otherwise, insert 'member' into the 'bandMembers' database and return the new member's id number.
  database('bandMembers').insert(member, 'id')
    // Run a callback on the returned id number
    .then(member => {
      // Return a 201 status code with a success message
      response.status(201).json(`Boy band member with id of ${member[0]} successfully created!`)
    })
    // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
    .catch(error => {
      response.status(500).json({ error })
    })
})

// Creates an endpoint for a POST request to add a new band member to the database at the '/api/v1/members/:id' route
app.post('/api/v1/bands', (request, response) => {
  // Declare a variable called 'band' and assign it to the value of the request body (i.e., the object containing the band's data)
  const band = request.body;
  // If the request body doesn't have a name property,
  if (!band.name) {
    // Return a 422 status code, along with an error message reminding the user what format the request body requires
    return response.status(422).send({ error: `Expected format: {
      name: <String>,
      highest_pos: <String>,
      highest_pos_date: <String>,
      highest_song: <String>,
      highest_song_vid: <URL>,
    }
    
    At least name is required. Please provide the band's name.`})
  }

  // Otherwise, insert 'band' into the 'bands' database and return the new band's id number.
  database('bands').insert(band, 'id')
    // Run a callback on the returned id number
    .then(band => {
      // Return a 201 status code with a success message
      response.status(201).json(`Boy band with id of ${band[0]} successfully created!`)
    })
    // If the server is unable to get the data (server side error), send back a 500 status code along with a JSON object containing the error msg.
    .catch(error => {
      response.status(500).json({ error })
    })
})

// Create an endpoint at the root route, so when someone navigates to the root of the app they see the following message displayed: 'For documentation on endpoints, please see https://github.com/ericwm76/boybands2'
app.get('/', (request, response) => {
  response.send('For documentation on endpoints, please see https://github.com/ericwm76/boybands2')
})

// Tells the app to listen for connections to the port, specified by the app.get('port) method, and console log the message when a connection is made.
app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})
// Bring in Express, which is what we use to...
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

// Creates a 
app.locals.title = 'Boy Bands and Their Members Since 1980';
app.use(express.json());
app.use(cors());
app.set('port', process.env.PORT || 3000);

app.get('/api/v1/bands', (request, response) => {
  database('bands').select()
  .then((bands) => {
    response.status(200).json(bands);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/members', (request, response) => {
  database('bandMembers').select()
  .then((members) => {
    response.status(200).json(members);
  })
  .catch((error) => {
    response.status(500).json({ error })
  });
});

app.get('/api/v1/bands/:id', (request, response) => {
  const { id } = request.params;
  database('bands')
    .where({ id: id })
    .then(band => {
      if (band.length === 0) {
        response
          .status(404)
          .json({ error: `There is not a boy band with an id of ${id}!` });
      }
      response.status(200).json(band[0]);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/members/:id', (request, response) => {
  const { id } = request.params;
  database('bandMembers')
    .where({ id: id })
    .then(member => {
      if (member.length === 0) {
        response
          .status(404)
          .json({ error: `There is not a boy band member with an id of ${id}!` });
      }
      response.status(200).json(member[0]);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/members/:id', (request, response) => {
  const { id } = request.params;
  database('bandMembers')
    .where({ id: id }).select().del()
    .then(r => {
      if (r === 0) {
        response
        .status(404)
        .json({ error: `There is not a boy band member with an id of ${id}!` });
      }
      response.status(200).json(`Boy band member ${id} successfully deleted!`)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/members', (request, response) => {
  const member = request.body;

  for (let requiredParam of ['name', 'band_name']) {
    if (!member[requiredParam]) {
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

  database('bandMembers').insert(member, 'id')
    .then(member => {
      response.status(201).json(`Boy band member with id of ${member[0]} successfully created!`)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/bands', (request, response) => {
  const band = request.body;

  if (!band.name) {
    return response.status(422).send({ error: `Expected format: {
      name: <String>,
      highest_pos: <String>,
      highest_pos_date: <String>,
      highest_song: <String>,
      highest_song_vid: <URL>,
    }
    
    At least name is required. Please provide the band's name.`})
  }

  database('bands').insert(band, 'id')
    .then(band => {
      response.status(201).json(`Boy band with id of ${band[0]} successfully created!`)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/', (request, response) => {
  response.send('For documentation on endpoints, please see https://github.com/ericwm76/boybands2')
})

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})
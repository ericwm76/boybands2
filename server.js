const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})
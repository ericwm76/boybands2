const express = require('express');
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

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('bands', table => {
      table.increments('id').primary();
      table.string('name');
      table.unique('name');
      table.integer('highest_pos').unsigned();
      table.string('highest_pos_date');
      table.string('highest_song');
      table.string('highest_song_vid');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('bandMembers', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('band_name');
      table.foreign('band_name').references('bands.name');
      table.string('dob');
      table.string('hair_color');
      table.string('hair_frosted');
      table.string('hair_style');
      table.string('eyes');
      table.string('facial_hair');
      table.string('accessories');
      table.string('top_style');
      table.string('bottom_style');
      table.string('instrument');
      table.integer('height').unsigned();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('bands'),
    knex.schema.dropTable('bandMembers')
  ]);
};
const bandsData = require('../../../src/data/bands');
const membersData = require('../../../src/data/members');

const createBand = (knex, band) => {
  return knex('bands').insert({
    band: band.band,
    highest_pos: band.highest_pos,
    highest_pos_date: band.highest_pos_date,
    highest_song: band.highest_song,
    highest_song_vid: band.highest_song_vid
  }, 'band')
  .then(bandName => {
    let membersPromises = [];
    membersData
      .filter(member => member.band === bandName[0])
      .forEach(member => {
        membersPromises.push(
          createBandMember(knex, {
            band: bandName[0],
            name: member.name,
            dob: member.dob,
            hair_color: member.hair_color,
            hair_frosted: member.hair_frosted,
            hair_style: member.hair_style,
            eyes: member.eyes,
            facial_hair: member.facial_hair,
            accessories: member.accessories,
            top_style: member.top_style,
            bottom_style: member.bottom_style,
            instrument: member.instrument,
            height: member.height
          })
        )
      });

    return Promise.all(membersPromises)
  })
}

const createBandMember = (knex, member) => {
  return knex('bandMembers').insert(member)
}

exports.seed = function(knex) {
  return knex('bandMembers').del()
    .then(() => knex('bands').del())
    .then(() => {
      let bandPromises = [];
      bandsData.forEach(band => {
        bandPromises.push(createBand(knex, band))
      })
      return Promise.all(bandPromises)
    })
    .catch(error => console.log(`Could not seed data due to error: ${error}`))
};

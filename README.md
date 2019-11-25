# I Want It All: Boy Bands and Their Members Since 1980

This API enables the user to retrieve and interact with data on all boy bands and their members since 1980. 

The data used to seed this database came from [The Pudding](https://pudding.cool/2018/11/boy-bands/). You can find the original data with documentation about how the data was compiled and criteria for which bands made the cut [here](https://github.com/the-pudding/data/tree/master/boybands). Check them out! They're doing some really amazing things with data-based visual essays on cultural topics from politics to sports to entertainment. 

## API Endpoints

### Base URL

### GET all boy bands:

<code>GET /api/v1/bands</code>  

#### Response
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>
      200
    </th>
    <th>
      Returns an array of all of the band objects
    </th>
  </tr>
</table>

#### Response Parameters
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td><code>number</code></td>
      <td>
        Unique band identifier.
      </td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>
        Name of boy band
      </td>
    </tr>
    <tr>
      <td><code>highest_pos</code></td>
      <td><code>string</code></td>
      <td>
        The highest position on the Billboard Top 100 charts reached by any of this boy band's songs.
      </td>
    </tr>
    <tr>
      <td><code>highest_pos_date</code></td>
      <td><code>string</code></td>
      <td>The date on which this boy band's biggest hit reached its highest position on the Billboard Top 100 charts. If the band had multiple hits reach the same position, the date given is the date of their earliest hit to reach that position.</td>
    </tr>
    <tr>
      <td><code>highest_song</code></td>
      <td><code>string</code></td>
      <td>The name of the song that reached the highest position on the Billboard Top 100 charts. If the band had multiple hits reach the same position, the song given is the earliest song to reach that position.</td>
    </tr>
    <tr>
      <td><code>highest_song_vid</code></td>
      <td><code>URL</code></td>
      <td>A URL linking to the music video for the band's highest song.</td>
    </tr>
  </tbody>
</table>

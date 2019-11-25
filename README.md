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
        Name of boy band.
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

<details><summary>Example response</summary>

```json 
[
  {
    "band": "NSYNC",
    "highest_pos": 1,
    "highest_pos_date": "2000-07-29",
    "highest_song": "It's Gonna Be Me",
    "highest_song_vid": "https://www.youtube.com/watch?v=GQMlWwIXg3M"
  }
]
```
</details>

---
### GET a specific boy band by ID:
<code>GET /api/v1/bands/:id</code>

#### Query Parameters
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
  </tbody>
</table>

#### Response
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <td>
      200
    </td>
    <td>
      Returns a specific boy band object.
    </td>
  </tr>
</table>

---

### GET all boy band members:

<code>GET /api/v1/members</code>  

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
      Returns an array of all of the band member objects
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
        Unique band member identifier.
      </td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>
        Name of boy band member.
      </td>
    </tr>
    <tr>
      <td><code>band_name</code></td>
      <td><code>string</code></td>
      <td>
        The name of the boy band of which they are/were a member.
      </td>
    </tr>
    <tr>
      <td><code>dob</code></td>
      <td><code>string</code></td>
      <td>The member's date of birth.</td>
    </tr>
    <tr>
      <td><code>hair_color</code></td>
      <td><code>string</code></td>
      <td>The boy band member's hair color.</td>
    </tr>
    <tr>
      <td><code>hair_frosted</code></td>
      <td><code>string</code></td>
      <td>Did the boy band member have frosted tips? Returns yes, no, red or green.</td>
    </tr>
    <tr>
      <td><code>hair_style</code></td>
      <td><code>string</code></td>
      <td>The boy band member's hair style.</td>
    </tr>
    <tr>
      <td><code>eyes</code></td>
      <td><code>string</code></td>
      <td>The boy band member's eye color.</td>
    </tr>
    <tr>
      <td><code>facial_hair</code></td>
      <td><code>string</code></td>
      <td>If the boy band member has facial hair, returns a description of the type (mustache, goatee, etc.)</td>
    </tr>
    <tr>
      <td><code>accessories</code></td>
      <td><code>string</code></td>
      <td>If the boy band member wears accessories, returns a description of the type (earrings, necklace, baseball hat, etc.)</td>
    </tr>
    <tr>
      <td><code>top_style</code></td>
      <td><code>string</code></td>
      <td>The style of top the boy band member typically wears on stage (t-shirt, suit jacket, etc.)</td>
    </tr>
    <tr>
      <td><code>bottom_style</code></td>
      <td><code>string</code></td>
      <td>The style of pants the boy band member typically wears on stage (dress pants, jeans, etc.)</td>
    </tr>
    <tr>
      <td><code>instruments</code></td>
      <td><code>string</code></td>
      <td>If the boy band member played an instrument, that instrument is returned here (bass, keyboard, etc.)</td>
    </tr>
  </tbody>
</table>

<details><summary>Example response</summary>

```json 
[
    {
        "id": 13,
        "name": "Justin Timberlake",
        "band_name": "NSYNC",
        "dob": "1/31/1981",
        "hair_color": "brown",
        "hair_frosted": "yes",
        "hair_style": "curly",
        "eyes": "blue",
        "facial_hair": "",
        "accessories": "earrings",
        "top_style": "other jacket, short-sleeve t-shirt",
        "bottom_style": "dress pants",
        "instrument": "",
        "height": null,
        "created_at": "2019-11-25T00:38:48.535Z",
        "updated_at": "2019-11-25T00:38:48.535Z"
    }
]
```
</details>

---
### GET a specific boy band member by ID:
<code>GET /api/v1/members/:id</code>

#### Query Parameters
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
        Unique band member identifier.
      </td>
    </tr>
  </tbody>
</table>

#### Response
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <td>
      200
    </td>
    <td>
      Returns a specific boy band member object.
    </td>
  </tr>
</table>

---
### Add a band:
<code>POST /api/v1/bands/</code> 

#### Parameters
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td><code>string</code></td>
      <td>
        Name of boy band.
      </td>
      <td>YES</td>
    </tr>
    <tr>
      <td><code>highest_pos</code></td>
      <td><code>string</code></td>
      <td>
        The highest position on the Billboard Top 100 charts reached by any of this boy band's songs.
      </td>
      <td>NO</td>
    </tr>
    <tr>
      <td><code>highest_pos_date</code></td>
      <td><code>string</code></td>
      <td>The date on which this boy band's biggest hit reached its highest position on the Billboard Top 100 charts. If the band had multiple hits reach the same position, the date given is the date of their earliest hit to reach that position.</td>
      <td>NO</td>
    </tr>
    <tr>
      <td><code>highest_song</code></td>
      <td><code>string</code></td>
      <td>The name of the song that reached the highest position on the Billboard Top 100 charts. If the band had multiple hits reach the same position, the song given is the earliest song to reach that position.</td>
      <td>NO</td>
    </tr>
    <tr>
      <td><code>highest_song_vid</code></td>
      <td><code>URL</code></td>
      <td>A URL linking to the music video for the band's highest song.</td>
      <td>NO</td>
    </tr>
  </tbody>
</table>

#### Response
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Response</th>
    </tr>
  </thead>
  <tr>
    <th>201</th>
    <th>Returns `Boy band with id of <band_id> successfully created!`</th>
  </tr>
    <tr>
    <th>422</th>
    <th>
      <code>
        { error: `Expected format: {
      name: <String>,
      highest_pos: <String>,
      highest_pos_date: <String>,
      highest_song: <String>,
      highest_song_vid: <URL>,
    }
    At least name is required. Please provide the band's name.` }
      </code> 
    </th>
  </tr>
</table>

<details><summary>Example response</summary>

```json
`Boy band with id of 63 successfully created!`
```
or

```
{ error: `Expected format: {
      name: <String>,
      highest_pos: <String>,
      highest_pos_date: <String>,
      highest_song: <String>,
      highest_song_vid: <URL>,
    }
    At least name is required. Please provide the band's name.` }
```
</details>



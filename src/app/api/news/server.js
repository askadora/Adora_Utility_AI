const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/news', async (req, res) => {
  try {
    const url = 'http://api.mediastack.com/v1/news?access_key=069674f8af5fce7e4cdf552f246ecf03&languages=en&keywords=artificial%20intelligence,AI,technology,tech&sort=published_desc&limit=20';

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/sources', async (req, res) => {
  try {
    const url = 'http://api.mediastack.com/v1/sources?access_key=069674f8af5fce7e4cdf552f246ecf03&categories=business&countries=us&languages=en&limit=20';

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error('Error fetching sources:', error.message);
    res.status(500).json({ error: 'Failed to fetch sources' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

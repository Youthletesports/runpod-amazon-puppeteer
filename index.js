import { spawn } from 'child_process';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/scrape', (req, res) => {
  const { url } = req.body;

  const scraper = spawn('node', ['scrape.js', url]);

  let result = '';
  scraper.stdout.on('data', data => {
    result += data.toString();
  });

  scraper.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  scraper.on('close', code => {
    if (code === 0) {
      res.send(result);
    } else {
      res.status(500).send('Scraper failed.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

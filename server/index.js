import express from 'express';
import corse from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import { spawnSync } from 'child_process';


const app = express();
const port = 3000;

app.use(corse({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());   

app.get('/api/executeSequence/:name', async (req, res) => {

  let sequenceName = req.params.name.replaceAll(' ', '-');
  sequenceName = sequenceName.toLowerCase();
  console.log(sequenceName);
  
  //console.log(pythonProcess.stdout.toString());

  try {

    let pythonProcess = await spawnSync('python',["main.py",sequenceName],{cwd: '../cvmotor/'});
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

  } catch (error) {
    res.status(500).send(error
      ? error
      : 'Something went wrong'
    );
  }

  let tasks = JSON.parse(fs.readFileSync('../cvmotor/logs/' + sequenceName + '.json', 'utf8'));
 

  let logs = {
    sequenceName: sequenceName,
    tasks: tasks
  }

  res.send(logs);
  
});

app.delete('/api/deleteSequence/:name', (req, res) => {
  let sequenceName = req.params.name.replaceAll(' ', '-');
  sequenceName = sequenceName.toLowerCase();
  fs.unlinkSync('./Sequences/' + sequenceName + '.json');
  res.send('Sequence Deleted');
});

app.put('/api/updateSequence', (req, res) => {
});

app.post('/api/saveNewSequence', (req, res) => {
  //Save New Sequence
  let sequence = req.body;
  let sequenceName = sequence.name.replaceAll(' ', '-');
  sequenceName = sequenceName.toLowerCase();
  fs.writeFileSync('./Sequences/' + sequenceName + '.json', JSON.stringify(sequence), 'utf8');
  res.send('Sequence Saved');
});

app.get('/api/getSequence/:name', (req, res) => {
  let sequenceName = req.params.name.replaceAll(' ', '-');
  sequenceName = sequenceName.toLowerCase();
  let sequence = JSON.parse(fs.readFileSync('./Sequences/' + sequenceName + '.json', 'utf8'));
  res.send(sequence);
});

app.get('/api/getSequences', (req, res) => {
  let sequences = [];
  let cnt = 1;
  fs.readdirSync('./Sequences').forEach(file => {
    file = file.replaceAll('.json', '');
    let sq = {
      id: cnt,
      name: file
    }
    sq.name = sq.name.replaceAll('-', ' ');
    sequences.push(sq);
  });
  res.send(sequences);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

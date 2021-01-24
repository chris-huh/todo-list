const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('API running');
});

const todos = ['foo', 'bar', 'baz'];

app.get('/todos', (req, res) => {
	console.log('/todos accesed, returning ', todos);
	return res.json(todos);
});

app.post('/todos', (req, res) => {
	todos.push(req.body.todo);
	return res.json(todos);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const app = express();
const port = process.emitWarning.PORT || 5001;

app.get('/', (req, res)=> res.send("API Working"));

app.listen(port, () => { console.log(`Server started on PORT: ${port}`)} )
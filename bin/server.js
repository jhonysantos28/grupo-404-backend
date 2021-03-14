const app = require('../src/app');

const port = (process.env.PORT) ? process.env.PORT: '2000';

app.listen(port, function(){
    console.log('START MICRO SERVICE [GRUPO - 404]  - PORT: ' + port)
})
var express = require('express')
var path = require('path');
var http = require('http');
var Schema = require('./schema')
var othetSchema = require('./schemaOther')
var graphQLHTTP = require('express-graphql')

var index = require('./app/routes/index');

var app = express();

app.use('/', index);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/graphQL', graphQLHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.use('/graphQLOther', graphQLHTTP({
  schema: othetSchema.schema,
  rootValue: othetSchema.root,
  graphiql: true,
}));

var initializeDB = require('./app/db/db');
initializeDB();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
	console.log("err", err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

// app.listen(port, (err) => {
//   if (err)
//     return console.error(err);
//   console.log(`GraphQL Server is now running on localhost:${port}`);
// });

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

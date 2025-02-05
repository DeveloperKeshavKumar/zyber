const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
   console.log(`Server is running at port http://localhost:${process.env.PORT}`);
});

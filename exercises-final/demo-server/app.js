const server = require('http').createServer();
const express = require('express');
const path = require('path');
const tickers = require('./tickers');
const WebSocketServer = require('ws').Server;
const Rx = require('rxjs/Rx');
const getSymbolStream = require('./getSymbolStream');
const cors = require('cors');

const app = express();
const PORT = 8080;

const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.static(path.join(__dirname, '../browser')));

app.get('/search/', (req, res) => {
  const q = req.query.q;
  if (!q) {
    res.send([]);
    return;
  }
  const data = tickers
    .filter(d => d.symbol.indexOf(q.toUpperCase()) === 0)
    .slice(0, 50);
  res.send(data);
});

let cid = 0;
wss.on('connection', (ws) => {
  const clientId = cid++;
  let symbolStreams = {};
  const subscription = new Rx.Subscription();

  console.log(`client ${clientId} CONNECTED`);

  ws.on('close', () => {
    console.log(`client ${clientId} CLOSED`);
    subscription.unsubscribe();
    symbolStreams = {};
  });

  ws.on('error', (error) => {
    console.log(`client ${clientId} ERROR`);
    console.error(error);
    subscription.unsubscribe();
    symbolStreams = {};
  });

  ws.on('message', (msg) => {
    let payload;
    console.log(`client ${clientId} -> ${msg}`);

    try {
      payload = JSON.parse(msg);
    } catch (err) {
      console.error(`ERROR: client ${clientId} - unable to parse message "${msg}"`);
    }
    const { type, symbol } = payload;
    switch (type) {
      case 'sub':
        if (!symbolStreams[symbol]) {
          symbolStreams[symbol] = subscription.add(
            getSymbolStream(symbol).subscribe(
              price => {
                if (ws.readyState === 1) {
                  const payload = JSON.stringify({ symbol, price });
                  console.log(`client ${clientId} <- ${payload}`);
                  ws.send(payload);
                }
              }
            )
          );
        }
        break;
      case 'unsub':
        if (symbolStreams[symbol]) {
          symbolStreams[symbol].unsubscribe();
          symbolStreams[symbol] = null;
        }
        break;
      default:
        console.error(`ERROR: client ${clientId}: unknown payload type: ${payload.type}`);
        break;
    }
  });
});


server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
server.on('request', app);

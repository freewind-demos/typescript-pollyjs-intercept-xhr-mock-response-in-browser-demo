import {Polly} from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';

Polly.register(FetchAdapter);

const url = 'https://jsonplaceholder.typicode.com/posts/404';

function setupServer() {
  const polly = new Polly('Simple Client-Side Server Example', {
    adapters: ['fetch'], // Hook into `fetch`
    logging: true // Log requests to console
  });
  const {server} = polly;

  server.get(url).intercept((req, res) => {
    res.status(200).json({content: 'Hello, Pollyjs!'});
  });
}

async function fetchData() {
  const response = await fetch(url);
  return await response.json();
}

function setupButton() {
  const button = document.getElementById('button')!;
  const message = document.getElementById('message')!;

  button.addEventListener('click', async () => {
    const post = await fetchData();
    message.innerText = JSON.stringify(post)
  })
}

function run() {
  setupServer();
  setupButton();
}

run();

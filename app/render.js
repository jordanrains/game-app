const {
  remote
} = require('electron');
const mainProcess = remote.require('./index.js');

document
  .querySelector('button')
  .addEventListener('click', () => {
    mainProcess.onClick();
  });

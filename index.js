const {
  app,
  session,
  BrowserWindow
} = require('electron')
const url = require('url')
const {
  URL,
  URLSearchParams
} = require('url')
const path = require('path')
const request = require('request')
const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch')
const crypto = require('crypto')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  // Start the session
  // ses = session.fromPartition('persist:name')
  // Create a unique id for this session
  id = crypto.randomBytes(20).toString('hex')
  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Open the DevTools.
  win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
exports.onClick = () => {
  const disc = new Discord()
  console.log(disc.authorize())
};
// Get the session
class Discord {
  authorize() {
    const apiEndpoint = new URL("https://discordapp.com/api/oauth2/authorize")
    const params = {
      'response_type': 'code',
      'client_id': '332269999912132097',
      'scope': 'bot/channels/296834334785142785',
      'state': id,
      'redirectURL': encodeURI('https://localhost/authorize')
    }
    Object.keys(params).forEach(key => apiEndpoint.searchParams.append(key, params[key]))
    return apiEndpoint
    fetch(apiEndpoint.href).then(res => {
      res.json()
    }).then(json => {
      return json
    }).catch(err => {
      console.error(err)
    })
  }
}

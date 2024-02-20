
"use strict";
const { create } = require('domain');
// index.js
// kinda like the backend code??

const { app, BrowserWindow, ipcMain, screen, Menu } = require('electron');
const path = require('path');
const url= require('url');

console.log('index.js is running');

let win;

function createWindow() {
    win = new BrowserWindow();
    // Menu.setApplicationMenu(null);

    win.loadURL(url.format({
        pathname: path.join('./index.html'),
        protocol: 'file',
        slashes: true,
    }));

    win.webContents.openDevTools();
    win.on('closed', () =>{
        win = null;
    });
}

app.on('ready', createWindow);

// for cring mac users
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});



// let mainWindow;

// function createWindow() {
//     const { width, height } = screen.getPrimaryDisplay().workAreaSize;
//     // win.setContentSize(width, height);
//     mainWindow = new BrowserWindow({
//         width: width / 1.5,
//         height: height / 1.5,
//         webPreferences: {
//             nodeIntegration: true,
//             // deviceScaleFactor: 1.0
//         }
//     });

//     mainWindow.loadFile('index.html');

//     mainWindow.on('resize', () => {
//         const { width, hight } = mainWindow.getContentBounds();
//         mainWindow.webContents.send('window-resize', { width, height });
//     });

//     // Move the setTimeout inside createWindow to have access to mainWindow
//     setTimeout(() => {
//         mainWindow.webContents.send('message-from-main', 'Hello from main process!');
//     }, 2000);
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// ipcMain.on('reply-from-renderer', (event, arg) => {
//     console.log(arg); // Output: 'Hello from renderer process!'
// });


const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

const { getAnthropic, initAnthropic, askClaude } = require("./anthropic")
const { getOpenAI, initOpenAI, askGPT, askDalle } = require("./openAI")

app.whenReady().then(main)

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

let mainWindow

function main() {
  let isDev = !app.isPackaged

  // isDev = false
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    show: false,
    resizable: true,
    backgroundColor: "#131313",
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      devTools: isDev,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  })

  mainWindow.setMenu(null)

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
  } else {
    mainWindow.loadFile(path.join(__dirname, "./ui/build/index.html"))
  }

  app.on("ready", () => setTimeout(onAppReady, 300))

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
    // mainWindow.webContents.openDevTools()
  })
}

// IPC handlers
ipcMain.handle("connectToAI", (event, model) => {
  if (model.toLowerCase().startsWith("gpt") && !getOpenAI()) {
    initOpenAI(OPENAI_API_KEY)
  } else if (model.toLowerCase().startsWith("claude") && !getAnthropic()) {
    initAnthropic(ANTHROPIC_API_KEY)
  }
})

ipcMain.handle("messageAI", async (event, model, messages) => {
  if (model.toLowerCase().startsWith("gpt") && getOpenAI()) {
    const response = await askGPT(messages, model)
    return response
  } else if (model.toLowerCase().startsWith("claude") && getAnthropic()) {
    const response = await askClaude(messages, model)
    return response
  } else if (model.toLowerCase().startsWith("dall-e")) {
    const response = await askDalle(messages, model)
    return response
  }
})

ipcMain.handle("download", async (event, url) => {
  console.log("downloading: ", url)
  mainWindow.webContents.downloadURL(url)
})

const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  getKey: (name) => ipcRenderer.invoke("getKey", name),
  connectToAI: (model) => ipcRenderer.invoke("connectToAI", model),
  messageAI: (model, messages, callback) =>
    ipcRenderer.invoke("messageAI", model, messages, callback),
  message: (message) => ipcRenderer.invoke("message", message),
  download: (url) => ipcRenderer.invoke("download", url),
})

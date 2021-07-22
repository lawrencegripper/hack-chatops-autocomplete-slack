// chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//   if (msg.color) {
//     console.log("Receive color = " + msg.color);
//     document.body.style.backgroundColor = msg.color;
//     sendResponse("Change color to " + msg.color);
//   } else {
//     sendResponse("Color message is none.");
//   }

//   runSlackAutocompletion()
// });

const getEditorElement = () : HTMLDivElement => document.querySelector("div.p-message_pane_input div[contenteditable=true]") as HTMLDivElement
const waitForEditor = () : Promise<HTMLDivElement> => {
  return new Promise((resolve) => {
    const tryAndGetElement = () => {
      const element = getEditorElement()
      if (element !== null) {
        resolve(element)
      } else {
        // try again later?
        window.requestAnimationFrame(tryAndGetElement)
      }
    }
    tryAndGetElement()
  })
}

const runSlackAutocompletion = async () => {
  const editorElement = await waitForEditor()
  if (editorElement === null) {
    console.log("No input panel found for slack skipping")
    return
  }
  editorElement.addEventListener("input", (e) => {
    console.log('edit made to page')
    console.log(editorElement.innerText)
  })
}

console.log('content script loaded')
runSlackAutocompletion()
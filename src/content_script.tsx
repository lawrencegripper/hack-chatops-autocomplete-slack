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

const getEditorElement = (): HTMLDivElement => document.querySelector("div.p-message_pane_input div[contenteditable=true]") as HTMLDivElement
const waitForEditor = (): Promise<HTMLDivElement> => {
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
  // Get the configured help
  let chatopsHelp: string = ""
  chrome.storage.local.get('chatopsHelp', (items) => {
    chatopsHelp = items.chatopsHelp;
    console.log("data loaded")
  })
  editorElement.addEventListener("input", (e) => {
    console.log('user input on page')
    let currentText = editorElement.innerText
    let dispalyElement: HTMLDivElement | null = document.querySelector("div.lg-chatopshelp-suggestions")
    // Skip any non chatops commands
    if (currentText.length < 2 || !currentText.startsWith('.')) {
      if (dispalyElement !== null) {
        dispalyElement.style.display = "none"
      }
      return
    }
    console.log('user typed ' + currentText)
    // Find lines that match
    let matches = []
    for (let line of chatopsHelp.split(/\r?\n/)) {
      if (line.startsWith(currentText)) {
        matches.push(line)
      }
    }
    // how many matches did we find?
    let matchesCount = matches.length
    console.log(matchesCount + " matches found")

    // Display lines that match
    if (dispalyElement === null) {
      dispalyElement = createDisplayElement(dispalyElement)
    } else {
      dispalyElement.innerHTML = ""
      dispalyElement.style.display = "block"
    }

    for (let line in matches) {
      let li = document.createElement("li")
      li.className = 'p-channel_sidebar__channel'
      li.style.whiteSpace = "nowrap"
      li.style.display = ""
      li.innerText = matches[line]
      dispalyElement.appendChild(li)

    }
  })
}

console.log('content script loaded')
runSlackAutocompletion()

function createDisplayElement(dispalyElement: HTMLDivElement | null) {
  dispalyElement = document.createElement("div")
  dispalyElement.style.display = "block"
  dispalyElement.className = "lg-chatopshelp-suggestions"
  // move element to top right
  dispalyElement.style.position = "absolute"
  dispalyElement.style.right = "0"
  dispalyElement.style.top = "0"
  dispalyElement.style.zIndex = "9999"
  dispalyElement.style.width = "800px"
  dispalyElement.style.height = "300px"
  dispalyElement.style.backgroundColor = "grey"
  dispalyElement.style.border = "1px solid black"
  dispalyElement.style.overflow = "hidden"
  dispalyElement.style.padding = "5px"
  document.body.appendChild(dispalyElement)
  return dispalyElement
}

const { ipcRenderer } = require("electron")
const ipc = ipcRenderer



var isLeftMenuActive = false;

fetch('Components/nav.html')
.then(res => res.text())
.then(htmlNav =>{
  // Elemento base es el script
  let oldElement = document.querySelector("script#replace_with_navbar");
  // Elemento nuevo es un div donde irá el html del nav
  let newElement = document.createElement("div");
  newElement.innerHTML = htmlNav;
  // Remplazamos el base por el nuevo
  oldElement.parentNode.replaceChild(newElement, oldElement);

  
  minimizeBtn = document.getElementById("minimize_btn");
  window_btn = document.getElementById("window_btn");
  closeBtn = document.getElementById("close_btn");
  showHideMenus = document.getElementById("showHideMenu");

  top_bar = document.querySelector("div.topBar");

minimize_btn.addEventListener('click', () => {
    ipc.send('minimizeApp')
  })
window_btn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
  })
  closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
  })
  showHideMenus.addEventListener('click', () => {
    if (isLeftMenuActive) {
      mySidebar.style.width = '0px';
      isLeftMenuActive = false;
    } else {
      mySidebar.style.width = '280px';
      isLeftMenuActive = true;
    }
  })
})
function changeMaxResBtn(isMaximizedApp) {
    if (isMaximizedApp) {
      window_btn.title = 'Restore'
      window_btn.classList.remove("restore_btn")
      window_btn.classList.add("window_btn")
    } 
    else {
      window_btn.title = 'Maximize'
      window_btn.classList.remove("window_btn")
      window_btn.classList.add("restore_btn") 
    }
}

function changeFocusTitleBar(isFocus) {
  if (isFocus) {
    top_bar.classList.remove("blur")
  } else {
    top_bar.classList.add("blur")
  }
}


ipc.on("isMaximized", () => {
  changeMaxResBtn(true)
})
ipc.on("isRestored", () => {
  changeMaxResBtn(false)
})

ipcRenderer.on("isFocus", () => {
  changeFocusTitleBar(true);
})

ipcRenderer.on("isBlur", () => {
  changeFocusTitleBar(false);
})


  
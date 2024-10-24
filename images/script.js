const menuicon = document.querySelector("#menuIcon")
const closeicon = document.querySelector("#closeicon")
const sidebar = document.querySelector("#sidebar")



menuicon.addEventListener("click", showSidebar)
closeicon.addEventListener("click", hideSidebar)


function showSidebar(){
    const sidebar = document.querySelector("#sidebar")
    sidebar.style.display = "flex"

}


function hideSidebar() {
    
    sidebar.style.display = "none"

}
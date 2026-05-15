
function copyCode(id){
const el=document.getElementById(id);
navigator.clipboard.writeText(el.innerText);
alert("Copied");
}
console.log("Ultimate Platform Loaded");

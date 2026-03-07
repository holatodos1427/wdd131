const currentyear = document.getElementById("currentyear");
const banana = document.getElementById("banana");

currentyear.textContent = new Date().getFullYear();
const lastMod = document.lastModified;
banana.textContent = "Last Modification: " + lastMod;
const namesElement = document.getElementById("names");
let names = [];
let currentIndexOfName = 0;

for (const name of namesElement.children) {
    if (name.className == "name") {
        names.push(name);
        name.classList.add(name.textContent);

        })
    }
}

let nrOfNames = names.length;

function getNameWithIndex(index) {
    return names[index];
}

function hideElementWithIndex(index) {
    let currentName = getNameWithIndex(index);
    currentName.style.zIndex = 1;
}

function showElementWithIndex(index) {
    let currentName = getNameWithIndex(index);
    currentName.style.zIndex = 3;
}

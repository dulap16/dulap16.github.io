const namesElement = document.getElementById("names");
const upperHiding = document.getElementById("upperHiding");
const lowerHiding = document.getElementById("lowerHiding");
const image = document.getElementById("image");

const imageNames = ["firstdate", "kissing", "badtzmaru", "redhair", "plantutz", "shelikemefr"];

console.log(getYOfElement(namesElement));

const upperY = -50;
const visibleY = 0;
const lowerY = 50;
const velocity = 5.3 / 1000;
const timeOfMovement = 570;
let names = [];
let currentIndexOfName = 0;

class gfName {
    constructor(element) {
        this.element = element;
        this.name = this.element.textContent;
        this.y = getYOfElement(this.element);

        this.finalY = this.y;

        this.startTime = 0;
        this.elapsedTime = 0;
    }

    get getElement() {
        return this.element;
    };

    get getName() {
        return this.name;
    };

    get getY() {
        return this.y;
    };

    set setFinalY(y) {
        this.finalY = y;
    };

    get getNextY() {
        return this.y + velocity * this.elapsedTime;
    };

    resetTime = () => {
        this.startTime = Date.now();
        this.elapsedTime = 0;
    };

    sendDown = () => {
        this.resetTime();
        this.moveToY(visibleY);

        this.finalY = lowerY;
    };

    sendMiddle = () => {
        this.resetTime();
        this.moveToY(upperY);

        this.finalY = visibleY;
    };

    moveToY(newY) {
        this.y = newY;
        this.finalY = this.y;
        this.element.style.top = newY + 'px';
    };

    updatePosition = () => {
        this.elapsedTime = Date.now() - this.startTime;
        if (this.elapsedTime > timeOfMovement) {
            this.moveToY(this.finalY);
            return;
        }

        let nextY = this.getNextY;
        this.moveToY(nextY);
    };
}

var gfNames = [];
for (const name of namesElement.children) {
    if (name.className == "name") {
        names.push(name);
        name.classList.add(name.textContent);

        gfNames.push(new gfName(name));

        name.addEventListener('click', function(event) {
            goToNextElement();
        })
    }
}

let currentName = gfNames[currentIndexOfName];
let nrOfNames = names.length;

function init() {
    changeImageFromIndex(0);
    showName(getgfNameWithIndex(0));
    for (let i = 1; i < nrOfNames; i++)
        hideName(getgfNameWithIndex(i));

    console.log("initializing");
}

function getURLFromText(text) {
    return `images/${text}.jpeg`;
}

function getImageTextFromIndex(index) {
    return imageNames[index];
}

function getURLFromIndex(index) {
    return getURLFromText(getImageTextFromIndex(index));
}

function changeImageFromIndex(index) {
    let url = getURLFromIndex(index);
    console.log(url);
    image.style.backgroundImage = `url('${url}')`;
}

function showName(name) {
    name.moveToY(visibleY);
}

function hideName(name) {
    name.moveToY(upperY);
}

function getPosOfElement(element) {
    var rect = element.getBoundingClientRect();
    var position = {
        x: rect.x,
        y: rect.y
    }

    return position;
}

function getYOfElement(element) {
    return getPosOfElement(element).y;
}

function getNameWithIndex(index) {
    return names[index];
}

function getgfNameWithIndex(index) {
    return gfNames[index];
}

function goToNextElement() {
    // console.log(currentName);
    currentName.sendDown();

    currentIndexOfName = currentIndexOfName + 1;
    if (currentIndexOfName >= nrOfNames)
        currentIndexOfName = 0;

    currentName = getgfNameWithIndex(currentIndexOfName);
    changeImageFromIndex(currentIndexOfName);
    currentName.sendMiddle();
}

const move = () => {
    gfNames.forEach((gf) => {
        gf.updatePosition();
    });

    requestAnimationFrame(move);
}


function main() {
    init();
    move();
}

main();
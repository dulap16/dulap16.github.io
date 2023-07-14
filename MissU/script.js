const namesElement = document.getElementById("names");
const upperHiding = document.getElementById("upperHiding");
const lowerHiding = document.getElementById("lowerHiding");

console.log(getYOfElement(namesElement));

const upperY = -50;
const visibleY = 0;
const lowerY = 50;
const velocity = 5.3 / 1000;
const timeOfMovement = 500;

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
    showName(getgfNameWithIndex(0));
    for (let i = 1; i < nrOfNames; i++)
        hideName(getgfNameWithIndex(i));

    console.log("initializing");
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

function getNameWithIndex(index) {
    return names[index];
}

function getgfNameWithIndex(index) {
    return gfNames[index];
}

function goToNextElement() {
    currentName.sendDown();

    currentIndexOfName = currentIndexOfName + 1;
    if (currentIndexOfName >= nrOfNames)
        currentIndexOfName = 0;

    currentName = getNameWithIndex(currentIndexOfName);
    currentName.sendMiddle();
}

function goToPreviousElement() {
    currentName.sendUp();

    currentIndexOfName = currentIndexOfName - 1;
    if (currentIndexOfName == -1)
        currentIndexOfName = nrOfNames - 1;

    currentName = getNameWithIndex(currentIndexOfName);
    currentName.sendMiddle();
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

function move() {
    gfNames.forEach((gf) => {
        gf.updatePosition();
    });

    requestAnimationFrame(move);
}
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
const speed = 0.1;

class gfName {
    constructor(element) {
        this.element = element;
        this.name = this.element.textContent;
        this.position = getPosOfElement(this.element);
        this.opacity = 1;

        this.finalY = this.position.y;
        this.finalOpacity = 1;
    }

    get getElement() {
        return this.element;
    };

    get getName() {
        return this.name;
    };

    get getPosition() {
        return this.position;
    };

    get getOpacity() {
        return this.opacity;
    };

    set setFinalY(y) {
        this.finalY = y;
    };

    set setFinalOpacity(opacity) {
        this.finalOpacity = opacity;
    };

    get getNextY() {
        return lerp(this.position.y, this.finalY, speed);
    }

    get getNextOpacity() {
        return lerp(this.opacity, this.finalOpacity, speed);
    }

    sendDown = () => {
        this.finalY = lowerY;
        this.finalOpacity = invisOpacity;
    }

    sendUp = () => {
        this.finalY = upperY;
        this.finalOpacity = invisOpacity;
    }

    sendMiddle = () => {
        this.finalY = visibleY;
        this.finalOpacity = visOpacity;
    }

    updatePosition = () => {
        if (this.finalY == this.position.y)
            return;

        this.position.y = this.getNextY;
        this.element.css({
            'transform': 'translate(0px, ' + this.position.y + 'px)'
        });
    }

    updateOpacity = () => {
        if (this.opacity == this.finalOpacity)
            return;

        let nextOpacity = this.getNextOpacity;
        this.opacity = nextOpacity;

        this.position.y = nextY;
        this.element.css({
            'opacity': nextOpacity
        });
    }
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
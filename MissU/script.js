const namesElement = document.getElementById("names");
const upperHiding = document.getElementById("upperHiding");
const lowerHiding = document.getElementById("lowerHiding");

const upperY = getPosOfElement(upperHiding).y;
const visibleY = 150;
const lowerY = getPosOfElement(lowerHiding).y;
const invisOpacity = 0;
const visOpacity = 1;

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

function goToNextElement() {
    console.log(currentIndexOfName);

    hideElementWithIndex(currentIndexOfName);
    currentIndexOfName = currentIndexOfName + 1;
    if (currentIndexOfName >= nrOfNames)
        currentIndexOfName = 1;

    console.log(currentIndexOfName);
    showElementWithIndex(currentIndexOfName);
}

function goToPreviousElement() {
    hideElementWithIndex(currentIndexOfName);

    currentIndexOfName = currentIndexOfName - 1;
    if (currentIndexOfName == 0)
        currentIndexOfName = nrOfNames;

    showElementWithIndex(currentIndexOfName);
}

showElementWithIndex(0);
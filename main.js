const status = document.getElementById('status');
const startBtn = document.getElementById('start-btn');
const buttons = document.getElementById("buttons");
const difficulty = document.querySelector('.difficulty');


let difLevel = 'easy';

let sequence = [[3], [3, 1], [3, 1, 2], [3, 1, 2, 0], [3, 1, 2, 0, 2]];
let sequenceArr = 0;
let sequenceNum = 0;

// what should be compared to what?
// the number of data-num of a targeted button
// Number(e.target.dataset.num)

// an array of numbers that were pressed
// compare to the numbers in sequence array
let enteredCurrentNumbers = [];

let numButton;
let color;

let isShowing;

startBtn.addEventListener('click', startGame);
buttons.addEventListener('click', buttonClick);

difficulty.addEventListener('click', changeDifficulty);

function changeDifficulty(e) {
	if (e.target.tagName == 'SPAN') {
		difficulty.childNodes.forEach(elem => {
			if (elem.nodeType === 1) {
				elem.classList.remove('level-active');
			}
		})
		e.target.classList.add('level-active');
		difLevel = e.target.getAttribute('id');
		setDifficulty(difLevel);
	}
}

function setDifficulty(difLevel) {
	if (difLevel == 'easy') {
		sequence = [[3], [3, 1], [3, 1, 2], [3, 1, 2, 0], [3, 1, 2, 0, 2]];
	}
	if (difLevel == 'medium') {
		sequence = [[2], [2, 0], [2, 0, 1], [2, 0, 1, 0], [2, 0, 1, 0, 3], [2, 0, 1, 0, 3, 2], [2, 0, 1, 0, 3, 2, 0], [2, 0, 1, 0, 3, 2, 0, 1]];
	}
	if (difLevel == 'hard') {
		sequence = [[0], [0, 3], [0, 3, 1], [0, 3, 1, 2], [0, 3, 1, 2, 3], [0, 3, 1, 2, 3, 2], [0, 3, 1, 2, 3, 2, 0], [0, 3, 1, 2, 3, 2, 0, 1], [0, 3, 1, 2, 3, 2, 0, 1, 2], [0, 3, 1, 2, 3, 2, 0, 1, 2, 3], [0, 3, 1, 2, 3, 2, 0, 1, 3, 2]];
	}
}

let showInterval;

function startGame() {
	status.innerText = 'Watch';
	isShowing = true;

	showInterval = setInterval(() => {
		buttons.childNodes.forEach(button => {
			if (button.nodeType === 1) {
				sequenceCheck(button);
			}
		});
	}, 800);
}

function sequenceCheck(button) {
	if (!sequence[sequenceArr]) {
		clearInterval(showInterval);
		status.innerText = 'Congratulations! You won!';
		startBtn.innerText = 'Restart';
	}
	else if (sequenceNum < sequence[sequenceArr].length) {
		let numButton = button.dataset.num;
		if (numButton == sequence[sequenceArr][sequenceNum]) {
			toggleClass(numButton);
		}
	}
}

function toggleClass(numButton) {
	setTimeout(() => addClass(numButton), 200);
	setTimeout(() => {
		removeClass(numButton);
		sequenceNum++;
		if (sequenceNum >= sequence[sequenceArr].length) {
			sequenceNum = 0;
			clearInterval(showInterval);
			isShowing = false;
			status.innerText = 'Play'
		}
	}, 500);
}

function addClass(numBtn) {
	let color = findColorName(numBtn);
	buttons.children[Number(numBtn)].classList.add(`${color}-active`);
}

function removeClass(numBtn) {
	let color = findColorName(numBtn);
	buttons.children[Number(numBtn)].classList.remove(`${color}-active`);
}

function findColorName(numBtn) {
	let color;
	switch (Number(numBtn)) {
		case 0:
			color = 'green';
			break;
		case 1:
			color = 'red';
			break;
		case 2:
			color = 'yellow';
			break;
		case 3:
			color = 'blue';
			break;
	}
	return color;
}


function buttonClick(e) {
	if (e.target.classList.contains('btn') && isShowing === false) {
		let enteredNum = e.target.dataset.num;
		enteredCurrentNumbers.push(Number(enteredNum));
	}
	if (enteredCurrentNumbers.length == sequence[sequenceArr].length) {
		let correctNumbers = 0;
		for (let i = 0; i < sequence[sequenceArr].length; i++) {
			if (sequence[sequenceArr][i] === enteredCurrentNumbers[i]) {
				correctNumbers++;
			}
		}
		if (correctNumbers == enteredCurrentNumbers.length) {
			enteredCurrentNumbers = [];
			sequenceArr++;
			status.innerText = 'Correct';
			startGame();
		}
		else {
			startBtn.innerText = 'Restart';
			status.innerText = 'Wrong! Try again';
			enteredCurrentNumbers = [];
			sequenceArr = 0;
			sequenceNum = 0;
		}
	} else if (enteredCurrentNumbers.length > sequence[sequenceArr].length) {
		startBtn.innerText = 'Restart';
		status.innerText = 'Wrong! Try again';
		enteredCurrentNumbers = [];
		sequenceArr = 0;
		sequenceNum = 0;
	}
}



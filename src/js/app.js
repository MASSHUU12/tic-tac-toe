const cellHolder = document.querySelector(".cell-holder");
const reset = document.querySelector(".reset");
const state = document.querySelector(".state");

const X = "X",
	O = "O";

let cells = [],
	cellsLeft = 9,
	turn = X;

function handleCellClick(e) {
	const cell = e.target;
	cell.innerText = turn;
	cell.removeEventListener("click", handleCellClick);
	cellsLeft--;

	if (checkWinner()) alert(`${turn} won!`);
	else if (cellsLeft <= 0) alert("Draw!");

	switchTurn();
}

function switchTurn() {
	turn = turn === X ? O : X;
	state.innerText = `${turn}'s turn`;
}

function checkWinner() {
	for (let i = 0; i < 3; i++) {
		const rowStartIndex = i * 3;
		const row = cells.slice(rowStartIndex, rowStartIndex + 3);
		const column = [cells[i], cells[i + 3], cells[i + 6]];

		if (row.every((c) => c.innerText === turn)) return true;
		if (column.every((c) => c.innerText === turn)) return true;
	}

	const diagonal1 = [cells[0], cells[4], cells[8]];
	const diagonal2 = [cells[2], cells[4], cells[6]];

	if (diagonal1.every((c) => c.innerText === turn)) return true;
	if (diagonal2.every((c) => c.innerText === turn)) return true;

	return false;
}

function resetGame() {
	cells = [];
	cellsLeft = 9;
	turn = X;

	state.innerText = `${turn}'s turn`;

	for (const td of cellHolder.getElementsByTagName("td")) {
		cells.push(td);
		td.innerText = "";
		td.addEventListener("click", handleCellClick);
	}
}

window.onload = function () {
	resetGame();
	reset.addEventListener("click", resetGame);
};

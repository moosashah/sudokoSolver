const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solve-button');
const squares = 81;
const submission = [];
const isSolvableBoard = document.querySelector('#isSolvableBoard');

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('min', 1);
  inputElement.setAttribute('max', 9);
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add('odd-section');
  }

  puzzleBoard.appendChild(inputElement);
}

const checkSolvable = isSolvable => {
  if (!isSolvable) {
    isSolvableBoard.innerText = 'unSolvable';
  }
  isSolvableBoard.innerText = 'Solvable';
};

const joinValues = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push('.');
    }
  });
  console.log(submission);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll('input');
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
  }
};

const solve = () => {
  joinValues();
  checkSolvable();
  const data = submission.join('');
  console.log('data:', data);
  const options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
      //api key missing (maybe get it from rapidapi.com if i wanna use it again?)
    },
    data: {
      puzzle: '2.............62....1....7...6..8...3...9...7...6..4...4....8....52.............3',
    },
  };

  axios
    .request(options)
    .then(response => {
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution);
    })
    .catch(error => {
      console.error(error);
    });
};

solveButton.addEventListener('click', solve);

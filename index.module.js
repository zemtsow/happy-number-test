const inputsContainer = document.getElementById('inputsContainer')
const squaresBlock = document.getElementById('squaresBlock')
const sqauresContainer = document.querySelectorAll('.square__container')
const squaresCountElem = document.getElementById('squaresCount')
const squares = document.querySelectorAll('.square')
const checkButton = document.getElementById('checkButton')

let options = {
  taskIndex: 0,
  right: 0,
  guess: 0,
  wrong: 0,
  actionsKeys: {
    "*": "x",
    "+": "+",
    "-": "-",
    "/": ":"
  },
  statuses: {
    wrong: () => {
      checkButton.innerText = "Wrong";
      const style = checkButton.style
      const allInputs = document.querySelectorAll(`#inputsContainer .task__block input`)[options.taskIndex]
      const inputStyle =  allInputs.style
      inputStyle.color = "#FA8072"
      inputStyle.borderBottom = "1px solid #FA8072"
      inputStyle.outlineColor = "#FA8072"
      style.backgroundColor = "#FA8072"
      style.color = "#fff"
        setTimeout(() => {
          style.backgroundColor = "#afeeee"
          style.color = "#000"
          inputStyle.borderBottom = "1px solid #000"
          inputStyle.outlineColor = "#000"
          inputStyle.color = "#000"
          inputStyle.borderBottom = "1px solid #000"
          return checkButton.innerText = "Check"
        }, 500)
    },
    done: () => {
      checkButton.innerText = "Done";
      const style = checkButton.style
      style.backgroundColor = "#228B22"
      style.color = "#fff"
        setTimeout(() => {
          style.backgroundColor = "#afeeee"
          style.color = "#000"
          return checkButton.innerText = "Check"
        }, 500)
    }
  }
}

const tasks = [
  {
    numberOne: 4,
    numberTwo: 1,
    method: "*",
    result: 4
  },
  {
    numberOne: 4,
    numberTwo: 2,
    method: "*",
    result: 8
  },
  {
    numberOne: 4,
    numberTwo: 3,
    method: "*",
    result: 12
  },
  {
    numberOne: 4,
    numberTwo: 4,
    method: "*",
    result: 16
  },
  {
    numberOne: 4,
    numberTwo: 5,
    method: "*",
    result: 20
  },
  {
    numberOne: 4,
    numberTwo: 6,
    method: "*",
    result: 24
  },
  {
    numberOne: 4,
    numberTwo: 7,
    method: "*",
    result: 28
  },
  {
    numberOne: 4,
    numberTwo: 8,
    method: "*",
    result: 32
  },
  {
    numberOne: 4,
    numberTwo: 9,
    method: "*",
    result: 36
  },
  {
    numberOne: 4,
    numberTwo: 10,
    method: "*",
    result: 40
  },
]

const generateSquaresContainer = () => {
  squaresBlock.innerHTML += `
    <div class="active__square square__container__show">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    `
    const activeSquare = document.querySelectorAll('.active__square')[options.taskIndex]
    setTimeout(() => {
      const elem = activeSquare.classList
      elem.remove('square__container__show')
      elem.add('square__container')
    },1000)
}

const generateMathMethod = () => {
  const task = tasks[options.taskIndex];
  const allInputs = document.querySelectorAll(`#inputsContainer .task__block input`);
  allInputs.forEach(input => input.disabled = true);

  inputsContainer.innerHTML += `
    <div class="task__block" id="task-${options.taskIndex}">
      <span>
        ${task.numberOne} ${options.actionsKeys[task.method]} ${task.numberTwo} =
      </span>
      <input type="number">
    </div>
  `;

  const newInput = document.querySelector(`#task-${options.taskIndex} input`);
  if (newInput) {
    newInput.addEventListener('input', (e) => {
      options.guess = parseInt(e.target.value);
    });
  }
};

const generateAnotherMethod = () => {
  if (options.taskIndex > 0) {
    const previousTaskIndex = options.taskIndex - 1;
    const previousTaskField = document.querySelector(`#task-${previousTaskIndex}`);
    if (previousTaskField) {
      previousTaskField.innerHTML = `
        <span>
          ${tasks[previousTaskIndex].numberOne} ${options.actionsKeys[tasks[previousTaskIndex].method]} ${tasks[previousTaskIndex].numberTwo} = ${tasks[previousTaskIndex].result}
        </span>
      `;
    }
  }

  if (options.taskIndex < tasks.length) {
    generateMathMethod();
  }
};


const init = () => {
  generateMathMethod()
}

init()

const check = (e) => {
  e.preventDefault()
  const task = tasks[options.taskIndex]
  if (options.guess === task.result) {
    options.taskIndex++;
    options.statuses.done()
    generateSquaresContainer()
    generateAnotherMethod()
  }
  else {
    options.statuses.wrong()
  }
}

checkButton.addEventListener("click", check)

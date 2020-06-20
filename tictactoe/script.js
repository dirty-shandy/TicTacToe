const xClass = 'x'
const circleClass = 'circle'
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[dataWinningMessageText]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
   const cell = e.target
   const currentClass = circleTurn ? circleClass : xClass
   placeMark(cell, currentClass)
   if (checkWin(currentClass)) {
        endGame(false)
   }
    //else if (isDraw()) {
     //  endGame(true)
    //}
   else {
    swapTurns()
    setBoardHoverClass()  
   }    
}



function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else { 
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
   return [...cellElements].every(cell => {
       return cell.classList.contains(xClass) || cell.cellElements.contains(circleClass);
   })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if(circleTurn) {
        board.classList.add(circleClass)
    } 
    else {
        board.classList.add(xClass)
    }
}

function checkWin(currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
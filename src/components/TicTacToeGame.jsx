import React from 'react'
import { useState } from 'react'
import Button from './Button';

var gameState = ["", "", "", "", "", "", "", "", ""]
const winningStates = [
    ["X", "X", "X", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "X", "X", "X", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "X", "X", "X"],

    ["X", "-", "-", "X", "-", "-", "X", "-", "-"],
    ["-", "X", "-", "-", "X", "-", "-", "X", "-"],
    ["-", "-", "X", "-", "-", "X", "-", "-", "X"],

    ["X", "-", "-", "-", "X", "-", "-", "-", "X"],
    ["-", "-", "X", "-", "X", "-", "X", "-", "-"],
]

const TicTacToeGame = () => {

    const [grid1_1, setgrid1_1] = useState('')
    const [grid1_2, setgrid1_2] = useState('')
    const [grid1_3, setgrid1_3] = useState('')

    const [grid2_1, setgrid2_1] = useState('')
    const [grid2_2, setgrid2_2] = useState('')
    const [grid2_3, setgrid2_3] = useState('')

    const [grid3_1, setgrid3_1] = useState('')
    const [grid3_2, setgrid3_2] = useState('')
    const [grid3_3, setgrid3_3] = useState('')

    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [tie, setTie] = useState(false)

    var fields = {
        1: setgrid1_1,
        2: setgrid1_2,
        3: setgrid1_3,
        4: setgrid2_1,
        5: setgrid2_2,
        6: setgrid2_3,
        7: setgrid3_1,
        8: setgrid3_2,
        9: setgrid3_3

    }

    const setField = (fieldNbr, value) => {
        fields[fieldNbr](value);
        gameState[fieldNbr - 1] = value
    }

    const makeMove = () => {

        let nextMove = getNextMove(gameState, "O");
        if(nextMove === -1)
        {
            setTie(true);
            return
        }

        setField(nextMove + 1, "O")
        if (checkForWin(gameState,true)) {
            setLose(true);
            return;
        }

    }


    const onMove = (fieldNbr) => {

        if (gameState[fieldNbr - 1] !== "")
            return;

        if (win || lose)
            return;

        setField(fieldNbr, "X")
        if (checkForWin(gameState,false)) {
            setWin(true);
            return;
        }

        makeMove();

    }

    const checkForWin = (field, bot) => {

        for (let i = 0; i < winningStates.length; i++) {
            let matches
            if (bot)
                matches = countMatches(field, winningStates[i].map((val) => val.replace("X", "O")));
            else
                matches = countMatches(field, winningStates[i]);

            if (matches >= 3)
                return true;
        }

        return false;
    }

    function countMatches(array1, array2) {
        let count = 0;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] === array2[i]) {
                count++;
            }
        }
        return count;
    }

    const resetGame = () => {

        for (let i = 1; i <= 9; i++)
            setField(i, "");

        setLose(false);
        setWin(false);
        setTie(false);
    }

    function getNextMove(field) {
        const playerSymbol = "X";
        const aiSymbol = "O";
        

        // Check for potential wins for the AI
        for (let i = 0; i < 9; i++) {
            if (field[i] === '') {
                const newField = field.slice(); // Copy the field to avoid modifying the original
                newField[i] = aiSymbol;
                if (checkForWin(newField,true)) {
                    return i;
                }
            }
        }

        // Check for potential wins for the player and block them
        for (let i = 0; i < 9; i++) {
            if (field[i] === '') {
                const newField = field.slice(); // Copy the field to avoid modifying the original
                newField[i] = playerSymbol;
                if (checkForWin(newField,false)) {
                    return i;
                }
            }
        }

        // Choose a random available cell
        const availableCells = [];
        for (let i = 0; i < 9; i++) {
            if (field[i] === '') {
                availableCells.push(i);
            }
        }
        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            return availableCells[randomIndex];
        }

        // If all cells are taken, return -1 to indicate a tie
        return -1;
    }

    return (
        <>
            <div className='containerTicTacToe'>
                <div className='item item-1' onClick={() => onMove(1)}>{grid1_1}</div>
                <div className='item item-2' onClick={() => onMove(2)}>{grid1_2}</div>
                <div className='item item-3' onClick={() => onMove(3)}>{grid1_3}</div>

                <div className='item item-1' onClick={() => onMove(4)}>{grid2_1}</div>
                <div className='item item-2' onClick={() => onMove(5)}>{grid2_2}</div>
                <div className='item item-3' onClick={() => onMove(6)}>{grid2_3}</div>

                <div className='item item-1' onClick={() => onMove(7)}>{grid3_1}</div>
                <div className='item item-2' onClick={() => onMove(8)}>{grid3_2}</div>
                <div className='item item-3' onClick={() => onMove(9)}>{grid3_3}</div>
            </div>

            {win && (<h1 className='win'>You Won!</h1>)}
            {lose && (<h1 className='lose'>You Lost!</h1>)}
            {tie && (<h1 className='tie'>Tie!</h1>)}

            <div className='resetGame'>
                <Button title="Reset Game" color="darkgray" className='resetGame' onClick={() => resetGame()}></Button>
            </div>
            <p></p>
        </>
    )
}

export default TicTacToeGame
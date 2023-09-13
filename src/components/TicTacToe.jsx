import React from 'react'
import { Link } from 'react-router-dom'
import TicTacToeGame from './TicTacToeGame'

const TicTacToe = () => {
  return (
    <div>
        <h2 className='GameHeadline'>TicTacToe</h2>
        <TicTacToeGame></TicTacToeGame>
        <br></br>
        <Link to='/'>Go Back</Link>
    </div>
  )
}

export default TicTacToe
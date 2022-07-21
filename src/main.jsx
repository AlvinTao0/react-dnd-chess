import React from 'react'
import ReactDOM from 'react-dom/client'
import Board from './Board'
import { observe } from './Game'
import './App.css'
import { useState } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root'))

observe((knightPosition) =>
  root.render(
    <Board knightPosition={knightPosition} />
  )
)

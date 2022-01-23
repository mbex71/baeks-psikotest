// import {s} from '@modules/entities/exam'

export interface ISoal {
  id:number
  question:string
  listOfChoise:string
  createdAt:Date
  updatedAt:Date
  
}

export interface IOptions {
    id:number
    question:string
    correctAnswer:string
    wrongAnswer:string
    createdAt:Date
    updatedAt:Date
}

export interface TypeSoal {
  id:number
  name:string
  createdAt:Date
  updatedAt:Date
}
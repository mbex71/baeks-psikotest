export type TParam = {
    testCode:string
}

export type TCorrectPerColumn = {
    soal?: number,
    totalJawaban?: number,
}

export type TWrongPerColumn = {
    soal?: number,
    totalJawaban?: number,
}

export type TResults = {
  sumCorrect:number
  sumWrong:number
  correctPerColumn:TCorrectPerColumn[]
  wrongPerColumn:TWrongPerColumn[]
  totalDikerjakan:number
  diver:number
}

import { IAccount } from "@modules/dto/account"
import { IUserExam } from "@modules/dto/exam"

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

export interface IResultsDetailDashboard extends TResults{
    testCode:string
    tujuan: string
    registrationDate: string
    status: string
    Account:IAccount
}
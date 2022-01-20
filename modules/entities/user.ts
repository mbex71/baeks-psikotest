import {IExam} from '@modules/entities/exam'

type Role = 'USER' |'ADMIN'

export interface IUser {
    id:number
  name:      string
  username:  string
  password:  string
  tglLahir: Date
  type:Role
  createdAt: Date
  updatedAt: Date
  Test?:      IExam[]
}
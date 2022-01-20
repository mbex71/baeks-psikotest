import {IExam} from '@modules/entities/exam'
import {IUser} from '@modules/entities/user'

export interface IUserExam extends IExam{
    User: IUser
}
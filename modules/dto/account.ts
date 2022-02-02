import {
    IUser
} from '@modules/entities/user'
import {ITest} from '@modules/entities/exam'



export type TCreateUserAccount =  Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'type' |'username' |'password'> & Omit<ITest, 'id' | 'createdAt' | 'updatedAt' |'testCode' | 'status' | 'registrationDate'>

export type TParamDetailAccount = {
    username:string
  }
export interface IAccount extends IUser {
    Test: ITest[]
}
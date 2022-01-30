import {ITest} from '@modules/entities/exam'
import {IUser} from '@modules/entities/user'
import {IOptions, ISoal, TypeSoal} from '@modules/entities/soal'

interface ISoalExam extends ISoal {
    Options:IOptions[]
        TypeSoal: TypeSoal
}

interface ISoalExamOnTest {
    time:number
    Soal:ISoalExam
}
export interface IUserExam extends ITest{
    Account: IUser
    soalOnTest?:ISoalExamOnTest[]
}

export type TPostSubmitJawaban = {
    testCode:string,
    soaldId:number,
    optionId:number,
    answer:string
}
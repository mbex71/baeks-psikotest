import {ITest} from '@modules/entities/exam'
import {IUser} from '@modules/entities/user'
import {IOptions, ISoal, TypeSoal} from '@modules/entities/soal'

interface ISoalExam extends ISoal {
    Options:IOptions[]
        TypeSoal: TypeSoal
}

interface ISoalExamOnTest {
    timer:number
    Soal:ISoalExam
}
export interface IUserExam extends ITest{
    Account: IUser
    soalOnTest?:ISoalExamOnTest[],
    testLength?:number
    optionsLength?:number
}

export type TPostSubmitJawaban = {
    testCode:string,
    soaldId:number,
    optionId:number,
    answer:string
}
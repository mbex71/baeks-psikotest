import {ITest} from '@modules/entities/exam'
import {IUser} from '@modules/entities/user'
import {IOptions, ISoal, TypeSoal} from '@modules/entities/soal'

interface ISoalExam extends ISoal {
    Options:IOptions[]
        TypeSoal: TypeSoal
}

interface ISoalExamOnTest {
    Soal:ISoalExam
}
export interface IUserExam extends ITest{
    User: IUser
    soalOnTest?:ISoalExamOnTest[]
}
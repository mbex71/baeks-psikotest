export type StatusTest = 'ACTIVE' |'ONGOING'|'SUCCESS'|'FAILED'


export interface ITest {
    id: number,
    testCode:string
    tujuan: string
    registrationDate: string
    status: string
}



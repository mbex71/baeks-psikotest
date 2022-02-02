export type StatusTest = 'ACTIVE' |'ONGOING'|'SUCCESS'|'FAILED' |'DONE'


export interface ITest {
    id: number,
    testCode:string
    tujuan: string
    registrationDate: string
    status: string
}



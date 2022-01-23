export type StatusTest = 'ACTIVE' |'ONGOING'|'SUCCESS'|'FAILED'


export interface ITest {
    id: string
    tujuan: string
    registrationDate: Date
    status: string
    createdAt: Date
    updatedAt: Date
}



type StatusTest = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface IExam {
    id:string        
    tujuan:string    
    registrationDate:Date
    status:StatusTest 
}
export interface ISoal {
    id:number
    pertanyaan: string[]
    pilihan:string[]
    time:number
    totalQuestion:number
}

export interface IPilihan {
    soal:string[]
    pilihan:string[]
}


export interface ISheetUjian extends ISoal{
    
    options: IPilihan[]
}
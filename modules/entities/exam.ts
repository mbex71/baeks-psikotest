type StatusTest = 'passed' | 'failed' | 'pending';

export interface IExam {
    id: number
    namaPeserta:string
    type: string
    tujuan: string
    tglPendaftaran: Date
    status: StatusTest
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


export interface ISheetUjian{
    soal:ISoal
    options: IPilihan[]
}
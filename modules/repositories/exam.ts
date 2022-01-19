import {IExam} from '@modules/entities/exam'

const examList = async ():Promise<IExam[]> =>{
    const data: IExam[] = [
        {
            id: 123123123,
            namaPeserta: 'Firdaus',
            status: "pending",
            tglPendaftaran: new Date("2020-01-01"),
            tujuan: "Pelatihan",
            type: 'kecermatan',
        },
        {
            id: 123123123,
            namaPeserta: 'Firdaus',
            status: "pending",
            tglPendaftaran: new Date("2020-01-01"),
            tujuan: "Pelatihan",
            type: 'kecermatan',
        },
        {
            id: 123123123,
            namaPeserta: 'Firdaus',
            status: "pending",
            tglPendaftaran: new Date("2020-01-01"),
            tujuan: "Pelatihan",
            type: 'kecermatan',
        },
        {
            id: 123123123,
            namaPeserta: 'Firdaus',
            status: "pending",
            tglPendaftaran: new Date("2020-01-01"),
            tujuan: "Pelatihan",
            type: 'kecermatan',
        },
        {
            id: 123123123,
            namaPeserta: 'Firdaus',
            status: "pending",
            tglPendaftaran: new Date("2020-01-01"),
            tujuan: "Pelatihan",
            type: 'kecermatan',
        },

    ]
    return await data
}

export{
    examList
}
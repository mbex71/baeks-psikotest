import prisma from '@configs/prisma'

const totalPeserta = async ():Promise<number> => {

    const data: any[] = await prisma.$queryRaw`SELECT count(a.id) as 'total' from Account a where type = 'USER';`
    
    return data?.[0].total as number
}


const totalUjian = async ():Promise<number> => {
    const data: any[] = await prisma.$queryRaw`SELECT count(t.id) as 'total' from Test t;`
    
    return data?.[0].total as number
}

export{
    totalPeserta,
     totalUjian
}
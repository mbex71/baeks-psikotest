import prisma from "@configs/prisma";

const updateTimer = async (value:number):Promise<void> =>{
    const timer = await prisma.timer.updateMany({      
        data:{
            value:value
        }
    })   

}

const getTimer = async ():Promise<{timer: number}> =>{
    const timer = await prisma.timer.findFirst({
        where:{
            id:1
        },
        select:{
            value:true
        }
    })

   
    const data = {
        timer : timer?.value as number
    }
    return  data
}


export {
    updateTimer,
    getTimer
}
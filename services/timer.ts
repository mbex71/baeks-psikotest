import prisma from "@configs/prisma";

const updateTimer = async (value:number):Promise<void> =>{
    const timer = await prisma.timer.updateMany({      
        data:{
            value:value
        }
    })   

}


export {
    updateTimer
}
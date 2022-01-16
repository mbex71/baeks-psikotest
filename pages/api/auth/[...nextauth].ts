import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient()

export default NextAuth({
    
    providers:[
        
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials:{
                username:{label:'Username', type:'text',placeholder:'Username'},
                password:{label:'Password', type:'password',placeholder:'Password'},
            },
            authorize: async (credentials, request) => {
                // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
                const user = await prismaClient.user.findFirst({
                    where:{name:credentials?.username, password:credentials?.password}
                })

                if (user) {
                    return user
                } else {
                    return null
                }
            
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    session:{
        strategy:'jwt',
        
    },
    jwt:{
        secret:process.env.JWT_SECRET,
    },
    pages:{
        signIn:'/auth/signin'
    },

    callbacks: {
        redirect({baseUrl, url}) {
            console.log('url ', url)
            return baseUrl
        }
    },
    logger:{
        debug(code, metaData){
            console.log('DEBUG: ', code)
        },
        error(code, metaData){
            console.log('ERROR: ',code)
        },
        warn(code){
            console.log('WARN: ', code)
        }
       
    }
})
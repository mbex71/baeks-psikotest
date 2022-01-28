import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prisma from '@configs/prisma'

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
                
                const user = await prisma.account.findFirst({
                    where:{username: credentials?.username ,password: credentials?.password}
                })

                if(user){
                    return user
                }
                else{
                    return Promise.reject(new Error('Account tidak ditemukan!'))
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
        signIn:'/auth/signin',
        error:'/auth/signin',

    },

    callbacks: {

        // jwt: async({ token, user, account, profile, isNewUser }) => {
            jwt: async(param) => {
            
                // console.log('PARAM TOKEN: ',param)
            if(param.user){
                
                param.token.id = param.user?.id
                param.token.name = param.user?.name
                param.token.username = param.user?.username
                param.token.type = param.user?.type
            }

            // console.log('TOKEN SAya: ',token)
         return param.token   
        },
        session: async ({ session,token, user}) => {
            
            if(token){
                
                session.user.id = token.id
                session.user.name = token.name
                session.user.username = token.username
                session.user.type = token.type
            }
            return session
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
       
    },
    
})
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
                
                const user = await prisma.user.findFirst({
                    where:{username: credentials?.username ,password: credentials?.password}
                })

                if(user){
                    return user
                }
                else{
                    return Promise.reject(new Error('Invalid Credentials'))
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

        jwt: async({ token, user, account, profile, isNewUser }) => {
            
        
            if(user){
                token.access_token = account?.access_token
                token.id = user?.id
                token.name = user?.name
                token.username = user?.username
                token.type = user?.type
            }
         return token   
        },
        session: async ({ session,token, user}) => {
            
            if(token){
                session.accessToken = token.access_token
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
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'


export default NextAuth({
    
    providers:[
        
        Credentials({
            name: 'Credentials',
            
            
            credentials:{
                username:{label:'Username', type:'text',placeholder:'Username'},
                password:{label:'Password', type:'password',placeholder:'Password'},
            },
            authorize: async (credentials, request) => {
                const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                
                    return user
                } else {
                    return null
                }
            
            }
        })
    ],
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
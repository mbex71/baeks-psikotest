type Role = 'USER' |'ADMIN'
export interface IUser {
  id:number
  name:      string
  username:  string
  password:  string
  tglLahir: string
  type:Role
  
}
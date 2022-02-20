import { NextPage } from "next";
import Head from "next/head";
import AuthLayout from "@components/layouts/AuthLayout";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useSession, signIn } from 'next-auth/react'
import type { SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RiLoader5Line, RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'

type TLogin = {
    username: string
    password: string
}

const Signin: NextPage = () => {
    const { data, status } = useSession()
    const router = useRouter()
    const { handleSubmit, register, setError, clearErrors, formState: { errors } } = useForm<TLogin>()
    const [showPass, setShowPass] = useState<boolean>(false)

    const onSubmit = (data: TLogin): void => {
        clearErrors('username')
        signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false

        }).then((resp: SignInResponse | undefined) => {

            if (resp?.error) {
                setError('username', { message: resp?.error })
            }
        })


    }

    useEffect(() => {


        if (status === 'authenticated') {
            if (data?.user.type === 'ADMIN') {

                router.push('/dashboard')
            }
            else {
                router.push('/exam')
            }
        }
    }, [status])

    const toggleShowPass = (): void => {
        setShowPass(prevState => !prevState)
    }

    return (
        <AuthLayout>
            <Head>
                <title>BAEKS - Psikotest</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='flex flex-col justify-center items-center min-h-screen w-full bg-slate-800 text-white px-2'>
                <div className='mb-12 w-full md:w-4/6 lg:w-3/6 text-center flex flex-col space-y-2'>
                    <h1 className='text-4xl font-bold tracking-wider'>Selamat datang</h1>
                    <h2 className="text-sm font-light text-white opacity-50">Silahkan masukan username dan password untuk masuk</h2>
                </div>



                <form className='flex flex-col justify-center items-center w-full md:w-4/6 lg:w-3/6 space-y-6 bg-slate-600 p-12 rounded' onSubmit={handleSubmit(onSubmit)}>
                    {
                        errors?.username?.message && <div className='mb-12 w-4/6 text-center text-sm text-red-500'>{errors?.username.message}</div>
                    }
                    <div className='flex flex-row justify-between items-center w-full'>
                        <label htmlFor="username" className='w-1/3 mr-2 text-sm font-bold'>Username</label>
                        <input
                            {...register('username')}
                            type="text"
                            id="username"
                            placeholder='Enter your username'
                            className='border text-black border-gray-400 p-2 rounded text-sm focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-600 w-2/3'
                        />
                    </div>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <label htmlFor="password" className='w-1/3 mr-2 text-sm font-bold'>Password</label>
                        <div className="w-2/3 relative flex items-center ">
                            <input
                                {...register('password')}
                                type={showPass ? 'text' : 'password'}
                                id="password"
                                placeholder='Please enter your password'
                                className='border text-black border-gray-400 p-2 rounded text-sm focus:outline focus:outline-1 focus:outline-offset-2 focus:outline-gray-600 w-full pr-12'
                            />
                            <button type="button" className="absolute right-4 origin-right z-20 text-black text-opacity-50 w-4" onClick={toggleShowPass}>{showPass ? <RiEyeFill /> : <RiEyeCloseFill />}</button>
                        </div>
                    </div>
                    <div className='w-full'>
                        <button disabled={status === 'loading'} className='bg-red-400 hover:bg-red-500 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline w-full text-sm flex justify-center items-center h-12 tracking-wider'>
                            {status === 'loading' ? <RiLoader5Line className="animate-spin" /> : <span>Masuk</span>}
                        </button>
                    </div>

                </form>

            </main>
        </AuthLayout>
    )
}

export default Signin
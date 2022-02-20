import { NextPage } from "next";
import { DashboardLayout } from '@components/layouts'
import { useTotalPeserta, useTotalUjian } from '@modules/hooks/dashboard/details'

const Dashboard: NextPage = () => {
    const totalPeserta = useTotalPeserta()
    const totalUjian = useTotalUjian()
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="mt-12">
                <div className="grid grid-cols-4 gap-12 mt-12">
                    <div className="w-60 h-60 bg-slate-600 text-white p-6 flex flex-col rounded-lg shadow-lg">
                        <h3 className="font-light tracking-wider text-center">Jumlah Pendaftar</h3>
                        <div className="h-full flex justify-center items-center text-4xl font-bold">{totalPeserta.data?.data}</div>
                    </div>
                    <div className="w-60 h-60 bg-slate-600 text-white p-6 flex flex-col rounded-lg shadow-lg">
                        <h3 className="font-light tracking-wider text-center">Jumlah Ujian</h3>
                        <div className="h-full flex justify-center items-center text-4xl font-bold">{totalUjian.data?.data}</div>
                    </div>
                    {/* <div className="w-60 h-60 bg-slate-600 text-white p-6 flex flex-col rounded-lg shadow-lg">
                        <h3 className="font-light tracking-wider text-center">Jumlah Pendaftar</h3>
                        <div className="h-full flex justify-center items-center text-4xl font-bold">100</div>
                    </div> */}
                    {/* <div className="w-60 h-60 bg-slate-600 text-white p-6 flex flex-col rounded-lg shadow-lg">
                        <h3 className="font-light tracking-wider text-center">Jumlah Pendaftar</h3>
                        <div className="h-full flex justify-center items-center text-4xl font-bold">100</div>
                    </div> */}
                </div>
            </div>
        </DashboardLayout >
    )
}

export default Dashboard
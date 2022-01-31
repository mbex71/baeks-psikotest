/* eslint-disable react/jsx-key */
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import type { Column } from 'react-table'
import { useCallback, useEffect } from 'react'

interface IProps {
    columns: Array<Column>,
    data: Array<any>,
    search?: string,

}


const DashboardTables: React.FC<IProps> = (props: IProps) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state: {
            pageIndex,
            globalFilter
        },
        setGlobalFilter

    } = useTable({
        columns: props.columns,
        data: props.data,
        initialState: {
            pageIndex: 0,
            pageSize: 10
        }
    }, useGlobalFilter, usePagination)


    const searchData = useCallback(() => {
        setGlobalFilter(props.search)
    }, [props.search])

    useEffect(() => {
        searchData()
    }, [props.search])

    if (props.data.length === 0) {
        return <div className='w-full justify-center items-center flex h-48 font-bold'>Data Not Found</div>
    }

    return (
        <>
            <table {...getTableProps()} className='table-auto w-full mt-6'>
                <thead className='bg-slate-600'>
                    {
                        headerGroups.map((headerGroup, index) => (
                            <tr  {...headerGroup.getHeaderGroupProps()}>
                                <th className='py-2 text-white'>
                                    No
                                </th>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className='py-2 text-white'>
                                            {column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))
                    }
                </thead>

                <tbody {...getTableBodyProps()} className='bg-slate-800'>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    <td className='p-2 text-sm text-center'>{row.index + 1}</td>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()} className='p-2 text-sm text-center py-4'>{cell.render('Cell')}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
            <div className='mt-12 flex flex-row space-x-12 justify-end items-center text-xs'>
                <button className={`text-white font-bold px-6 py-2 ${canPreviousPage ? 'text-opacity-100' : 'text-opacity-25'} `} onClick={() => previousPage()} disabled={!canPreviousPage}>Prev</button>
                <div className='text-white'>{pageIndex + 1} </div>
                <button className={`text-white font-bold px-6 py-2 ${canNextPage ? 'text-opacity-100' : 'text-opacity-25'}`} onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    )
}

export default DashboardTables
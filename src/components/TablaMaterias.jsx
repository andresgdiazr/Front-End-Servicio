import React from 'react'
import { useTable } from 'react-table'
import { useState, useEffect, useMemo } from 'react';
import {COLUMNS} from './columns';


import '../css/tablas.css'

export function TablaMaterias({datos}) {
    const columns = useMemo(() => COLUMNS);

    const data = useMemo(()=> datos);
    
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =    useTable({ columns, data });

    return (
        <div className="container">
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                if(cell.value!==undefined) return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                        
                                    </td>
                                      
                                );
                                else return(
                                    <td {...cell.getCellProps()}>
                                    
                                        <button>oki</button>
                                    </td>
                                    
                                )
                            })}
                          
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    );
  
}

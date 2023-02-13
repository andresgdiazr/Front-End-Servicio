import React from 'react'
import { useTable } from 'react-table'
import { useState, useEffect, useMemo } from 'react';
import {INFO_PROFESOR} from './columnas';
import { useNavigate } from 'react-router-dom';
import { getProfesores } from '../../api/profesores';
import axios from 'axios';

import '../../css/tablas.css';


export function INFO_PROFESORES({input,navbar}) {
 //   const [data, setData] = useState([]);

 const[datos,setData]=useState([]);
 const navigate=useNavigate();
 
 const informacion = (id) =>{
     navigate(`/admin/profesores/${id}/clases`,{state: navbar})
 }
 const modificar = (id) =>{
    navigate(`/admin/profesores/${id}/modificar`,{state: navbar})
 }

    useEffect(() => {
       const fetchProfesores= async () => {
       axios.defaults.headers.common['Authorization'] = "Bearer " + "NjU.6L5VwGevxF-BNvrRFlItcVoKG4SFAwZE1b4RhzxjwyXwyl7ggx37oQZlUNwd";
        
       const profesoresRes = await getProfesores();
         console.log(profesoresRes);
         setData(profesoresRes);

         const filteredData = datos.filter((el) => {
            //if no input the return the original
            if (input === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.nombre.toLowerCase().includes(input)
            }
        });
        
       };
    
       fetchProfesores();
    
    }, []);

    
    
    

    const columns = useMemo(() => INFO_PROFESOR);
    
    
    const data = useMemo(()=>filteredData);
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

                                if(typeof(cell.value)!=="number") return (
                                    <td {...cell.getCellProps()}>
                                     {cell.render('Cell')}
                                    </td>
                                      
                                );
                                else return(
                                    <td {...cell.getCellProps()}>
                                          <button onClick={ () => {informacion(cell.value)}}>Enviar</button>
                                          <button onClick={ () => {modificar(cell.value)}}>Modificar</button>
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

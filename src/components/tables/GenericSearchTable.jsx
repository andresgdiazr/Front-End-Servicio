import React from "react";

import { useTable } from "react-table";
import { useState, useEffect, useMemo } from "react";

import { css } from "@emotion/react";

import "../../css/tablas.css";

import THead from "../molecules/THead";
import EmptyTableRow from "../molecules/EmptyTableRow";

function TablaBusqueda({
	input = "",
	datos,
	formato,
	emptyMessage = "No se encontraron resultados",
	acciones: Acciones = () => null,
}) {
	

	const filteredData = datos.filter((el) => {
		//if no input the return the original



		if (input === "") {
			return el;
		} else if (el.cedula.includes(input)) {
			return el.cedula.includes(input);
		} else if (el?.email && el.email.includes(input)) {
			return el.email.includes(input);
		} else {
			return el.nombre.toLowerCase().includes(input);
		}
		//return the item which contains the user input
	});

	//Informacion referente a la tabla

	const columns = useMemo(() => formato);
	const data = useMemo(() => filteredData);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	//Referente a cada fila y su contenido

	const renderCell = (cell) => {
		if (cell.column.id === "acciones") {
			return (
				<td {...cell.getCellProps()}>
					<div
						css={css`
              width=100%;
              display:flex;
              justify-content:space-evenly;
              align-items:center;
              svg {
                cursor:pointer;
              }
            `}
					>
						<Acciones cell={cell} />
					</div>
				</td>
			);
		} else {
			return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
		}
	};

	return (
		<div className="container">
			<table
				css={css`
					td,
					th {
						text-align: center;
					}
				`}
				{...getTableProps()}
			>
				<THead headerGroups={headerGroups} />
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} data-row-id={row.original?.id}>
								{row.cells.map((cell) => renderCell(cell))}
							</tr>
						);
					})}
					<EmptyTableRow
						message={emptyMessage}
						rows={rows}
						headerGroups={headerGroups}
					/>
				</tbody>
			</table>
		</div>
	);
}

export default TablaBusqueda;

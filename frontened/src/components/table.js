import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import { useWeb3Context } from '../context/contractContext';
import moment from 'moment'

const columns = [
    { id: '_str', label: 'data', minWidth: 100 },

    { id: 'sender', label: 'Sender', minWidth: 100 },
    {
        id: 'time', label: 'Date', minWidth: 100, format: (value) => new moment.unix(value).format("MM/DD/YYYY")
    },
    { id: 'block_number', label: 'tx Hash', minWidth: 100 },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'right',
    }
];

export default function ColumnGroupingTable({ handleModal }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { transactions } = useWeb3Context()
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={12}>
                                Storage
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column, i) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'action'
                                                        ? <Button
                                                            // variant="contained"
                                                            color={"primary"}
                                                            onClick={() => {
                                                                handleModal(row);
                                                            }}
                                                        >
                                                            Update
                                                        </Button>

                                                        : column.format ? column.format(row[i]) : row[i]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

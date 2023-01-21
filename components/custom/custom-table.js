import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { myLoader } from '../../lib/ImageLoader';
import { Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from 'next/link';
import { PAGE_LINK_COIN, PAGE_LINK_MARKET } from '../../constants';
import { useRouter } from 'next/router';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.text.secondary,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: theme.typography.body2,
        color: theme.palette.text.primary,
        margin: 1,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomTable(props) {
    const router = useRouter();
    const { list, langage } = props;
    const theme = useTheme();

    return (
        <TableContainer component={Paper} >
            <Table sx={{ py: 30 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell theme={theme}>{"#"}</StyledTableCell>
                        <StyledTableCell theme={theme} align="left">Coin</StyledTableCell>
                        <StyledTableCell align="left">Price</StyledTableCell>
                        <StyledTableCell align="left">Volume</StyledTableCell>
                        <StyledTableCell align="left">1h change</StyledTableCell>
                        <StyledTableCell align="left">24h change</StyledTableCell>
                        <StyledTableCell align="left">7d change</StyledTableCell>
                        <StyledTableCell align="left">Mkt Cap</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <StyledTableRow key={row.name} onClick={() => {
                            router.push(
                                {
                                    pathname:`${PAGE_LINK_COIN}/${row.id}`
                                }
                            );
                            /*
                            router.push({
                                pathname: `${PAGE_LINK_COIN}/${row.id}`,
                                query: {...router.query, id: `${row.id}`},
                            });
                            */
                        }}
                            sx={{
                                cursor: 'pointer',
                                ":hover": {
                                    background: 'var(--grey)'
                                }
                            }}>
                            <StyledTableCell component="th" scope="row">
                                {row.market_cap_rank}
                            </StyledTableCell>
                            <StyledTableCell align="right" scope="row">
                                <Grid container direction={'row'} spacing={1} alignItems={'center'} justifyContent={'start'}>
                                    <Grid item alignItems={'center'} justifyContent={'center'}>
                                        <Image
                                            src={row.image}
                                            alt={row.name}
                                            width={30}
                                            height={30}
                                            loader={myLoader}
                                            priority
                                            quality={100}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <span style={{ marginRight: 5 }}>{row.name}</span>
                                        <span>{row.symbol.toString().toUpperCase()}</span>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="left">{`$ ${row.current_price.toFixed(2)}`}</StyledTableCell>
                            <StyledTableCell align="left">{row.total_volume.toLocaleString()}</StyledTableCell>
                            <StyledTableCell align="left">
                                <p style={{ color: row.price_change_percentage_1h_in_currency < 0 ? 'red' : 'green' }}>
                                    {row.price_change_percentage_1h_in_currency < 0 ?
                                        <ArrowDownwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} /> :
                                        <ArrowUpwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} />
                                    }
                                    {`${row.price_change_percentage_1h_in_currency.toFixed(2)}%`}
                                </p>
                            </StyledTableCell>


                            <StyledTableCell align="left">
                                <p style={{ color: row.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                                    {row.price_change_percentage_24h < 0 ?
                                        <ArrowDownwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} /> :
                                        <ArrowUpwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} />
                                    }
                                    {`${row.price_change_percentage_24h.toFixed(2)}%`}
                                </p>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <p style={{ color: row.price_change_percentage_7d_in_currency < 0 ? 'red' : 'green' }}>
                                    {row.price_change_percentage_7d_in_currency < 0 ?
                                        <ArrowDownwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} /> :
                                        <ArrowUpwardIcon color='inherit' sx={{ verticalAlign: 'middle' }} />
                                    }
                                    {`${row.price_change_percentage_7d_in_currency.toFixed(2)}%`}
                                </p>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.market_cap.toLocaleString()}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {tableCellClasses} from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {styled} from '@mui/material/styles';
import {GameCardSet} from "./GameCardSet.ts";
import {Link} from "react-router-dom";

type Props = {
    allCardSets: GameCardSet[],
    allMyCardSets: GameCardSet[]
}
export default function GameCardSetTable(props: Props) {

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "rgb(109,117,124)",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    return (
        <>
            <TableContainer component={Paper} sx={{mt: 2, boxShadow: 0}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Set name</StyledTableCell>
                            <StyledTableCell align="right">Number of cards</StyledTableCell>
                            {/*<TableCell align="right">Author</TableCell>*/}
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allMyCardSets.map((row: GameCardSet) => (
                            <StyledTableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.count}</StyledTableCell>
                                {/*<TableCell align="right">{row.author}</TableCell>*/}
                                <StyledTableCell align="right">
                                    <Link to={"/card-edit"}>
                                        <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                                    sx={{color: "#0c6b18", boxShadow: 0}}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}
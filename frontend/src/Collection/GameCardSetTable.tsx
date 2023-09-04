import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import {GameCardSet} from "./GameCardSet.ts";

type Props = {
    allCardSets: GameCardSet[]
}
export default function GameCardSetTable(props: Props) {


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Set name</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Number of cards</TableCell>
                            <TableCell align="right">see</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allCardSets.map((row: GameCardSet) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                {/*<TableCell align="right">{row.author}</TableCell>*/}
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell align="right">{" "}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}
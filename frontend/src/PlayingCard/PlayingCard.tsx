import './PlayingCard.css';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
export default function PlayingCard(){
    return(
        <>
            <h2>coming soon...</h2>
            <Button color="inherit">
                <Link to="/">back</Link>
            </Button>
        </>
    )

}
import "./Header.css"
import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";



type Props = {
    user: string
    onLogout: () => void
}

export default function Header(props: Props) {

    return (
        <>

            <div className={"menu"}>
                <Stack direction="row" spacing={1.0} justifyContent={"end"}>
                <div className={"userName"}> ☺︎ {props.user}</div>
                <Tooltip title="Logout">
                    <Button size="small"
                            sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}} onClick={props.onLogout}>
                        x
                    </Button>
                </Tooltip>


                    <Tooltip title="Card Collection">
                        <IconButton size="small"
                                    sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}}>
                            <Link to="/card-collection"><MenuBookIcon/></Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Game Record">
                        <IconButton size="small"
                                    sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}}>
                            <Link to="/game-record"><EmojiEventsIcon/></Link>
                        </IconButton>
                    </Tooltip>

                </Stack>
            </div>
        </>
    )
}

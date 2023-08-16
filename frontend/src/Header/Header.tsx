import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./Header.css"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";


type Props = {
    user: string | undefined
    onLogout: () => void
}

export default function Header(props: Props) {

    return (
        <>

            <div className={"menu"}>
                <Stack direction="row" spacing={1.0} justifyContent={"space-between"} id={"userButton"}>
                    <Tooltip title="Logout">
                        <Button size="small"
                                sx={{color: "#FDEEBE", background: "#69d1ca", boxShadow: 0, borderRadius: '50px'}}
                                onClick={props.onLogout}>
                            ☺︎ {props.user}
                        </Button>
                    </Tooltip>
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title={"home"}>
                            <IconButton size={"small"}
                                        sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0}}>
                                <Link to="/"><HomeRoundedIcon/></Link>
                            </IconButton>
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
                </Stack>
            </div>
        </>
    )
}
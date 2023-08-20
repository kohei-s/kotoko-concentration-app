import {Button, IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsIcon from '@mui/icons-material/Settings';
import "./Header.css"

type Props = {
    user: string | undefined
    achievement: string | undefined
    onLogout: () => void
}

export default function Header(props: Props) {

    return (
        <>

            <div className={"menu"}>
                <Stack direction="row" spacing={1.0} justifyContent={"space-between"} id={"userButton"}>
                    <Tooltip title="Logout">
                        <Button size="small"
                                sx={{color: "#FDEEBE", background: "#69d1ca", boxShadow: 0, borderRadius: '50px', padding: 1}}
                                onClick={props.onLogout}>
                            ☻{props.user} <span>&nbsp;♥︎{props.achievement}</span>
                        </Button>
                    </Tooltip>
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title={"home"}>
                            <IconButton size={"small"}
                                        sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0}} disableRipple={true}>
                                <Link to="/"><HomeRoundedIcon/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Card Collection">
                            <IconButton size="small"
                                        sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}} disableRipple={true}>
                                <Link to="/card-collection"><MenuBookIcon/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Game Record">
                            <IconButton size="small"
                                        sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}} disableRipple={true}>
                                <Link to="/game-record"><EmojiEventsIcon/></Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Setting">
                            <IconButton size="small"
                                        sx={{background: "rgba(0,0,0,0.51)", boxShadow: 0, borderRadius: '50px'}} disableRipple={true}>
                                <Link to="/setting"><SettingsIcon/></Link>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </div>
        </>
    )
}

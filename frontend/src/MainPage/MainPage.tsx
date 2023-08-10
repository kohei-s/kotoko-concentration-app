import "./MainPage.css"
import {IconButton, Stack, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import AppsIcon from '@mui/icons-material/Apps';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function MainPage() {


    return (
        <>
            <div className={"start"}>
                <img height={"290vm"} src="/logos/kotoko-logo.png" alt="start"/>
            </div>
            <Stack direction="row" spacing={2.5} justifyContent={"center"}>
                <Tooltip title="Game Manu">
                    <IconButton size="large" sx={{background: "#D05F5F", boxShadow: 0, borderRadius: '50px'}}>
                        <Link to="/game-menu"><AppsIcon/></Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Card Collection">
                    <IconButton size="large" sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '50px'}}>
                        <Link to="/card-collection"><MenuBookIcon/></Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Game Record">
                    <IconButton size="large" sx={{background: "#73683F", boxShadow: 0, borderRadius: '50px'}}>
                        <Link to="/game-record"><EmojiEventsIcon/></Link>
                    </IconButton>
                </Tooltip>
            </Stack>
        </>
    )

}

import {IconButton, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";

export default function GameRecord(){

    return (
    <>
        <div>
            <Stack direction="row" spacing={0.4} justifyContent={"end"}>
                <IconButton size={"small"}
                            sx={{background: "#D05F5F", boxShadow: 0}}>
                    <Link to="/"><HomeRoundedIcon/></Link>
                </IconButton>
                <IconButton size={"small"}
                            sx={{background: "#4D6A9A", boxShadow: 0, borderRadius: '15px'}}>
                    <ReplayRoundedIcon/>
                </IconButton>
            </Stack>
        </div>
        <div>
            <img width={"150px"} height={"150px"} src={"/logos/records-logo.png"}
                 alt={"records-logo"}/>
        </div>

    </>
    )

}

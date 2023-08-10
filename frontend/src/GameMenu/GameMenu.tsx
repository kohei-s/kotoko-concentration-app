import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

export default function GameMenu (){

    return (
     <>
     <h2>Game Menu</h2>
         <Stack direction="row" spacing={0.5} justifyContent="center">
             <Button variant="contained" sx={{background:"#D05F5F", boxShadow:0, borderRadius:'20px'}}>
                 <Link to="/hiragana">あ</Link>
             </Button>
             <Button variant="contained" sx={{background:"#4D6A9A", boxShadow:0, borderRadius:'20px'}}>
                 <Link to="/katakana">ア</Link>
             </Button>
             <Button  variant="contained" sx={{background:"#73683F", boxShadow:0, borderRadius:'20px'}}>
                 <Link to="/playing-card">♥♠</Link>
             </Button>
             <Button  variant="contained" sx={{background:"#73683F", boxShadow:0, borderRadius:'20px'}}>
                 <Link to="/custom">custom</Link>
             </Button>
         </Stack>
     </>
    )

}

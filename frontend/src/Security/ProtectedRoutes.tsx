import {Navigate, Outlet} from "react-router-dom";
import Header from "../Header/Header.tsx";

type Props = {
    user: string | undefined
    achievement: string | undefined
    logout: () => void
}

export default function ProtectedRoutes(props: Props) {

    const isAuthenticated = props.user !== undefined && props.user !== "Anonymous User";

    return (
        isAuthenticated? <><Header user={props.user} achievement={props.achievement}  onLogout={props.logout}/><Outlet/></>: <Navigate to="/login"/>
    )
}

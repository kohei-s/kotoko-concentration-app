import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user: string | undefined
}

export default function ProtectedRoutes(props: Props) {

    const isAuthenticated = props.user !== undefined && props.user !== "Anonymous User";

    return (
        isAuthenticated? <Outlet /> : <Navigate to="/login"/>
    )
}

import "./Header.css"

type Props = {
    user: string
    onLogout: () => void
}

export default function Header(props: Props) {

    return (
        <>
            <div>{props.user}</div>
            <button onClick={props.onLogout}>logout</button>
        </>
    )
}
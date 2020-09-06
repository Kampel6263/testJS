import React from "react";

const LoggedIn = (props) => {
    setTimeout(() => {
        {
            alert('Authorization successful')
        }
    }, 300)
    return (
        <>
            You loginned
            <button onClick={props.logout}>Log out</button>

        </>
    )
}
export default LoggedIn;
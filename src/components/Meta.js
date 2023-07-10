import { Helmet } from "react-helmet"; /**React Helmet can be termed as the document head
manager for React-based applications. Using it, it becomes very easy for developers to update meta tags present on the 
server-side and the client-side.  */
import React from 'react'

const Meta = (props) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
        </Helmet>
    )
}

export default Meta
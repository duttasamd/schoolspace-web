import React from 'react'
import "../profile/userPicUpload/userpicmodal.css"
import ForumItemBody from './ForumItemBody';

function ForumItem(props) {
    

    let forumContent = <ForumItemBody/>

    if (props.data) {

        forumContent = 
        props.data.map ((item, key) => 
            <ForumItemBody 
                username={item.username}
                post={item.post}
                replies={item.replies}
            />
        )

    }


    return (
        forumContent
    )
}

export default ForumItem

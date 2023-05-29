import React, {useState} from "react";


const FeedItem = (props : any) =>{
    ///1) component which have 
    const id = props.val._id;
    const [title, setTitle] = useState(props.val.title);
    const [content, setContent] = useState(props.val.content);
    const [editOn, setEditOn] = useState(false);

    const submitEdit = async () => {
        await props.editPost(id, title, content);
        setEditOn(false);
    }

    return (
        <div>
            <div  className={"feed-item"}>
            <div className={"delete-item"} onClick={(e) => props.deletePost(`${id}`)}>ⓧ</div>
            { (editOn)? (
                    <div>
                        <div className={"edit-button"} onClick={submitEdit}>Finish Edit</div>
                        <input type='text' placeholder='edit Title' onChange={(t) => setTitle(t.target.value)}></input>
                        <input type='text' placeholder='edit Content' onChange={(c) => setContent(c.target.value)}></input>
                    </div>
                ):(
                    <div>
                        <div className={"edit-button"} onClick= { () => setEditOn(true)}>Start Edit</div>
                        <h3 className={"feed-title"}>{ title }</h3>
                        <p className={"feed-body"}>{ content }</p>
                    </div>
                )
            }
            
          </div>
        </div>
    )

}
export default FeedItem;
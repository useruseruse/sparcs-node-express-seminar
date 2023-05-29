import React, {useState} from "react";


const FeedItem = (props) =>{
    ///1) component which have 
    const id = props.val.id
    const title = props.val.title
    const content = props.val.content
    const [editOn, setEditOn] = useState(false);
    const [STitle, setSTitle] = useState("");
    const [SContent, setSContent] = useState("");

    const submitEdit = async () => {
        await props.editPost(id, STitle, SContent);
        setEditOn(false);
    }

    return (
        <div>
            <div  className={"feed-item"}>
            <div className={"delete-item"} onClick={(e) => props.deletePost(`${id}`)}>ⓧ</div>
            { (editOn)? (
                    <div>
                        <div className={"edit-button"} onClick={submitEdit}>Finish Edit</div>
                        <input type='text' placeholder='edit Title' onChange={(t) => setSTitle(t.target.value)}></input>
                        <input type='text' placeholder='edit Content' onChange={(c) => setSContent(c.target.value)}></input>
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
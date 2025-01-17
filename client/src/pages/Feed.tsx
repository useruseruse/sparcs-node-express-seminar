<<<<<<< HEAD:client/src/pages/feed.tsx
import React, { useState } from "react";
=======
import React  from "react";
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/feed.css";
<<<<<<< HEAD:client/src/pages/feed.tsx
import FeedItem from "./feedItem";
=======
import FeedItem from "./feedItem"
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx

interface IAPIResponse  { _id: string, title: string, content: string, itemViewCnt: number }

const FeedPage = (props:{}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(10);
  const [ SNewPostTitle, setSNewPostTitle ] = React.useState<string>("");
  const [ SNewPostContent, setSNewPostContent ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
<<<<<<< HEAD:client/src/pages/feed.tsx
  const [ Edited, setEdited ] = React.useState<Boolean>(false);
=======
  const [ edited, setEdited ] = React.useState<boolean>(false);
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx
  React.useEffect( () => {
    if(edited){
      setEdited(false);
    }
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/feed/getFeed?count=${ NPostCount }&search=${ SSearchItem }`);
      console.log(data);
      // const data = [ { id: 0, title: "test1", content: "Example body" }, { id: 1, title: "test2", content: "Example body" }, { id: 2, title: "test3", content: "Example body" } ].slice(0, NPostCount);
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
<<<<<<< HEAD:client/src/pages/feed.tsx
  }, [ NPostCount, SSearchItem, Edited ]);
=======
  }, [ NPostCount, SSearchItem , edited]);
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/feed/addFeed', { title: SNewPostTitle, content: SNewPostContent } );
      setNPostCount(NPostCount + 1);
      setSNewPostTitle("");
      setSNewPostContent("");
    
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const deletePost = (id: string) => {
    const asyncFun = async () => {
<<<<<<< HEAD:client/src/pages/feed.tsx
      // One can set X-HTTP-Method header to DELETE to specify deletion as well
      await axios.post( SAPIBase + '/feed/deleteFeed', { _id: id } );
=======
      // One can set X-HTTP-Method header to DELETE to specify deletion as welf
      await axios.post( SAPIBase + '/feed/deleteFeed', { id: id } );
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx
      setNPostCount(Math.max(NPostCount - 1, 0));
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }
<<<<<<< HEAD:client/src/pages/feed.tsx


const editPost = (id: string, title: string, content: string) => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/feed/editFeed', {id: id, title: title, content: content} );
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED ${e}`));
  }


=======
 
  const editPost = (id: string, title: string, content: string) => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/feed/editFeed', {id: id, title: title, content: content} );
      setEdited(true);
    } 
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED ${e}`));
  }
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx
  return (
    <div className="Feed">
      <Header/> 
      <h2>Feed</h2>
      <div className={"feed-length-input"}>
        Number of posts to show: &nbsp;&nbsp;
        <input type={"number"} value={ NPostCount } id={"post-count-input"} min={0}
               onChange={ (e) => setNPostCount( parseInt(e.target.value) ) }
        />
      </div>
      <div className={"feed-length-input"}>
        Search Keyword: &nbsp;&nbsp;
        <input type={"text"} value={ SSearchItem } id={"post-search-input"}
               onChange={ (e) => setSSearchItem( e.target.value ) }
        />
      </div>
      <div className={"feed-list"}>
<<<<<<< HEAD:client/src/pages/feed.tsx
        { LAPIResponse.map((val,id) =>
          <FeedItem val={val} id={id} editPost={editPost} deletePost={deletePost}/>        
=======
        { LAPIResponse.map((val,i) =>
          <FeedItem val={val} i={i} editPost={editPost} deletePost={deletePost}/>        
>>>>>>> 76ef288e9e6e61c2e93d650f32bee31643bb4e58:client/src/pages/Feed.tsx
        )}
        <div className={"feed-item-add"}>
          Title: <input type={"text"} value={SNewPostTitle} onChange={(e) => setSNewPostTitle(e.target.value)}/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Content: <input type={"text"} value={SNewPostContent} onChange={(e) => setSNewPostContent(e.target.value)}/>
          <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add Post!</div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
import React ,{useEffect , useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import InputPostComment from "../components/InputPostComment";
import PostCardBody from "../components/PostCardBody";
import PostCardFooter from "../components/PostCardFooter";
import PostCardHeader from "../components/PostCardHeader";
import PostComments from "../components/PostComments";
import {getPostsingle} from "../redux/actions/postActions"

const Post = () => {
  const [post,setpost] = useState([]);
  const {auth, detailPost} = useSelector(state => state);
  const {id} = useParams();
  const dispatch = useDispatch();


  useEffect(()=>{
  dispatch(getPostsingle({detailPost, auth, id}))
    if(detailPost.length > 0){
      const newPost= detailPost.filter(item => item._id === id)
      setpost(newPost)
    }
  },[detailPost,auth,id, dispatch])
  return (

    <div style={{width:'600px' , maxWidth:'100%', margin:'auto'}}>
      {
                post && post.length > 0 && post.map((pos)=>(
                    <div className="postCards" style={{backgroundColor:'white',padding:'1rem', marginTop:'1rem', borderRadius:'10px', boxShadow:'3px 3px 5px gray',width:'500px'}} >
                        <PostCardHeader pos={pos}/>
                        <PostCardBody pos={pos}/>
                        <PostCardFooter pos={pos}/>
                        <PostComments pos={pos}/>
                        <InputPostComment pos={pos}/>
                    
                    </div>
                ))
            }
    </div>
  );
};

export default Post;

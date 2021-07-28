import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

const LikePost = ({isLike, handleLike,handleUnLike}) =>{
    return (
        <div>
           {
               isLike 
               ? <FavoriteIcon onClick={handleUnLike} style={{color:'purple'}}/>
               : <FavoriteIcon onClick={handleLike} style={{color:'black'}}/>

           }
        </div>
    )
}

export default LikePost;
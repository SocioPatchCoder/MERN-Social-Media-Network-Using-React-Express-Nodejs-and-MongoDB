import React from 'react' ;
import  FriendsCard  from './FriendsCard';




const Friends = ({userData, dispatch, profile, auth, id}) =>{
    // const [userData, setUserData] = useState([]);
    // const {id} =  useParams();
    // const { auth, profile } = useSelector(state => state);
    // const dispatch = useDispatch();
    // //At the start , redux store is undefined. it will take time 
    // useEffect(()=>{
    //         if(auth && auth.user && id === auth.user._id) {
    //             setUserData([auth.user]) // it should be in array . as we declared it.
    //         }else{
    //             dispatch(getProfileUsers({users: profile.users, id , auth}))
    //             const newData = profile.users.filter(user=>user._id === id)
    //             setUserData(newData)   //this is already an array.
    //         }
    // },[id, auth.user, ,auth, profile.users, dispatch])

    return (
       
        <div>
            {userData.length > 0 && userData.map(user=> (
            <FriendsCard user={user.friends} key={user._id}/>
            ))}
        </div>
    )
}

export default Friends
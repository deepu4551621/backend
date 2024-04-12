import  Axios  from "axios";
import toast from "react-hot-toast";
import {useSelector, useDispatch} from 'react-redux'
import { updateCourse } from "../reducers/userSlice";
const Card = ({course}) => {
    const dispatch=useDispatch()
  const {id, roles} = useSelector((state)=>state.user?.userData)
  const uid =id
const handleEnroll=async( cid)=>{
 
const toastId=  toast.loading('enrolling...')
    try {
      await Axios.post(`https://backend-omega-orpin.vercel.app/addCourse`, {uid, cid}).then((res)=>{
    if(res.status===200){
      toast.dismiss(toastId)
      console.log('added' ,res.data)
      dispatch(updateCourse(res.data.courseData))
      toast.success(res.data.message)
    }})
} catch (e) {
    toast.dismiss(toastId)
    toast.error(e.response.data.message)
      console.log(e)
    }
}
  return (
    <>
        <div className='cDiv' key={course.course_id}>
          <h2 className='title'>{course.title}</h2>
          <p className='desc'>{course.description}</p>
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
         <span className='auther'>{course.author}</span>
          <button disabled={roles === 'user'}  style={{ backgroundColor: roles === 'user' ? 'silver' :
           'green' }} onClick={()=>handleEnroll(course.course_id)}>enRoll</button>
         </div>
        </div>
    </>
  );
};

export default Card;

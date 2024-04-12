import  Axios  from "axios";
import toast from "react-hot-toast";
import {useSelector} from 'react-redux'
import { MdOutlineDeleteOutline } from "react-icons/md";
const Courses = ({courses, deletebtn}) => {
  const {id, roles} = useSelector((state)=>state.user?.userData)
  console.log('data', id, roles)
  const uid =id
// delete course
const deleteCourse = async (cid) => {
  const toastId = toast.loading('Deleting...', { duration: 3000 });

  try {
    const res = await Axios.delete(`https://backend-omega-orpin.vercel.app/deleteCourse`, {
      data: { uid: uid, cid: cid }, // Sending uid and cid in the request body
    });

    if (res.status === 200) {
      toast.dismiss(toastId);
      toast.success(res.data.message, { duration: 2000 });
    }
  } catch (e) {
    toast.dismiss(toastId);
    toast.error(e?.response?.data.message)
    console.error("Error deleting course:", e);
  }
};

  return (
    <>
      {courses?.map((course) => (
        <div className='cDiv' key={course.course_id}>
          <h2 className='title'>{course.title}</h2>
          <p className='desc'>{course.description}</p>
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
         <span className='auther'>{course.author}</span>
          {
          deletebtn? <button disabled={roles === 'user'}  style={{ backgroundColor: roles === 'user' ? 'silver' : '#eee4' }} onClick={()=>deleteCourse(course.course_id)}>
            <MdOutlineDeleteOutline size={30} color="red"/>
          </button>:null
         }
         </div>
        </div>
      ))}
    </>
  );
};

export default Courses;

import  Axios  from "axios";
import {useSelector} from 'react-redux'
const Courses = ({courses}) => {
  const uid = useSelector((state)=>state.user.useId)
  // console.log("d", data.courses);
const handleEnroll=async(cid)=>{
  console.log('uid', uid, '\ncid', cid)
    try {
      await Axios.post('https://backend-omega-orpin.vercel.app/addCourse')
    } catch (error) {
      
    }
}
  return (
    <>
      {courses.map((course) => (
        <div className='cDiv' key={course.course_id}>
          <h2 className='title'>{course.title}</h2>
          <p className='desc'>{course.description}</p>
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
         <span className='auther'>{course.author}</span>
          <button onClick={()=>handleEnroll(course.course_id)}>enRoll</button>
         </div>
        </div>
      ))}
    </>
  );
};

export default Courses;

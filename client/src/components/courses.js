import data from '../data.json';

const Courses = ({courses}) => {
  // console.log("d", data.courses);
const handleEnroll=()=>{
    console.log('course added')
}
  return (
    <>
      {courses.map((course) => (
        <div className='cDiv' key={course.course_id}>
          <h2 className='title'>{course.title}</h2>
          <p className='desc'>{course.description}</p>
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
         <span className='auther'>{course.author}</span>
          <button onClick={handleEnroll}>enRoll</button>
         </div>
        </div>
      ))}
    </>
  );
};

export default Courses;

import data from '../data.json';

const Courses = () => {
  console.log("d", data.courses);
const handleEnroll=()=>{
    console.log('course added')
}
  return (
    <>
      {data.courses.map((course, index) => (
        <div className='cDiv' key={index}>
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

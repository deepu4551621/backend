import { useSelector } from "react-redux";
import { useState } from "react";
import Card from "./Card";
const Pagination=()=>{
    const { availableCourses } = useSelector((state) => state.data);
    const [currentPage, setCurrentPage] = useState(1);
    const coursePerPage = 7;
    const startIndex = (currentPage - 1) * coursePerPage;
    const endIndex = startIndex + coursePerPage;
    const currentCourse = availableCourses.slice(startIndex, endIndex);
  // console.log('ab', currentCourse)
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    return (
        <>
        <div className="courseDiv">
        {currentCourse.map((course, index) => (
              <Card key={index} course={course}/>
        ))} 
      </div>
        <div className='pagination'>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(Math.ceil(availableCourses.length / coursePerPage)).keys()].map((pageNumber) => (
                <li className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`} key={pageNumber + 1}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(availableCourses.length / coursePerPage) ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(availableCourses.length / coursePerPage)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
          </div>
          </>
    )
}
export default Pagination
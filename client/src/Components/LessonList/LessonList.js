import React, { useEffect } from 'react'
import LessonCard from '../LessonCard/LessonCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLessons } from '../../JS/Actions/lesson';

const LessonList = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { listLessons, load, error } = useSelector(state => state.lessonReducer);
  const listCourses = useSelector(state => state.courseReducer.listCourses); // Récupère la liste des cours
  const user = useSelector(state => state.userReducer.user);

  // Trouver le cours par courseId
  const course = listCourses.find(c => c._id === courseId);

  useEffect(() => {
    if (courseId) {
      dispatch(getLessons(courseId));
    }
  }, [dispatch, courseId]);

  if (load) return <p>Chargement des leçons...</p>;
  if (error) return <p>Erreur : {error.message || error}</p>;

  return (
    <div className="d-flex flex-wrap gap-3">
      {listLessons.map(lesson => (
        <LessonCard
          key={lesson._id}
          lesson={lesson}
          course={course}    
          user={user}      
        />
      ))}
    </div>
  );
}

export default LessonList;

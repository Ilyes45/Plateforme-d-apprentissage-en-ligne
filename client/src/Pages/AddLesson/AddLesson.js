import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addLesson } from '../../JS/Actions/lesson';

const AddLesson = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState({
    title: '',
    content: '',
    videoUrl: '',
    courseId: courseId,
  });

  const handleChange = (e) => {
    setLessonData({ ...lessonData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLesson(lessonData));
    navigate(`/lesson/${courseId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titre de la leçon"
        value={lessonData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Contenu de la leçon"
        value={lessonData.content}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="videoUrl"
        placeholder="URL de la vidéo (optionnel)"
        value={lessonData.videoUrl}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>Ajouter la leçon</button>
    </form>
  );
};

export default AddLesson;

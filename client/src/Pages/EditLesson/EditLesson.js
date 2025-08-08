import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, editLesson } from '../../JS/Actions/lesson';
import { useParams, useNavigate } from 'react-router-dom';

const EditLesson = () => {
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lessonToGet, load, error } = useSelector(state => state.lessonReducer);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    videoUrl: '',
  });

  useEffect(() => {
    dispatch(getLesson(lessonId));
  }, [dispatch, lessonId]);

  useEffect(() => {
    if (lessonToGet) {
      setFormData({
        title: lessonToGet.title || '',
        content: lessonToGet.content || '',
        videoUrl: lessonToGet.videoUrl || '',
      });
    }
  }, [lessonToGet]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editLesson(lessonId, formData));
    navigate(`/lesson/${lessonToGet.courseId}`); // rediriger vers la liste des lessons du cours
  };

  if (load) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message || error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titre de la leçon"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Contenu de la leçon"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="videoUrl"
        placeholder="URL de la vidéo (optionnel)"
        value={formData.videoUrl}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>Modifier la leçon</button>
    </form>
  );
};

export default EditLesson;

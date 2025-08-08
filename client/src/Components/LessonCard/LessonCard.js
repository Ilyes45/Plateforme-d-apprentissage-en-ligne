import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLesson } from "../../JS/Actions/lesson";

const LessonCard = ({ lesson, course, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("LessonCard Props:", { lesson, course, user });

  // Pour éviter erreur si course non défini encore
   const createdById = typeof course?.createdBy === 'string' ? course.createdBy : course?.createdBy?._id;
const isOwner = user?._id === createdById;


  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{lesson.title}</Card.Title>
          <Card.Text>{lesson.content.substring(0, 100)}...</Card.Text>
          <Button variant="primary" onClick={() => navigate(`/lesson/${lesson._id}`)}>
            Voir la leçon
          </Button>
          {isOwner && (
  <>
    <Button variant="primary" onClick={() => dispatch(deleteLesson(lesson._id))}>Delete Lesson</Button>
    <Button variant="primary" onClick={() => navigate(`/edit-lesson/${lesson._id}`)}>Edit Lesson</Button>

  </>
)}

        </Card.Body>
      </Card>
    </div>
  );
};

export default LessonCard;

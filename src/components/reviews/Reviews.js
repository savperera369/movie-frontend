import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  const params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;

    try {
      const response = await api.post('/api/v1/reviews', {
        reviewBody: rev.value,
        imdbId: movieId
      });
      
      console.log(reviews);
      const updatedReviews = [...reviews, { body: rev.value }];
  
      rev.value = "";
      setReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Row>
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col><img src={movie?.poster} alt="Movie Poster" /></Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review"/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {
            reviews && reviews.map((review, i)=> {
              return (
                <div key={i}>
                  <Row>
                    <Col>
                      {review.body}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </div>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews

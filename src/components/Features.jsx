import {Container, Card, Row} from 'react-bootstrap';
import growth from './../images/icons/growth.svg';
import star from './../images/icons/star.svg';
import time from './../images/icons/time.svg';
import safe from './../images/icons/safe.svg';

const Features = () => {
    return (
        <Container>
            <h1 className="text-center mt-5 mb-5" style={{color: 'rgb(25, 135, 84)'}}>Why choose us?</h1>
            <Row xs={1} md={2} lg={4} className="g-4"> 
                <Card md className="border-0">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <img src={star} alt="" width={70} height={70} />
                        <Card.Title className="text-center">Experience the quality of our service</Card.Title>
                        <Card.Text className="text-center">
                        Our service is built on quality, and that's why we're proud to feature a star on our logo. We strive to provide top-notch service to all our customers and are constantly working to improve and exceed their expectations
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card md className="border-0">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <img src={growth} alt="" width={70} height={70} />
                        <Card.Title className="text-center">Impressive growth</Card.Title>
                        <Card.Text className="text-center">
                        We take pride in our impressive growth over the years. Our commitment to quality service and customer satisfaction has enabled us to expand rapidly and establish ourselves as a leader in the industry. From a small startup to a thriving business, we continue to grow and evolve, providing our customers with the best possible experience
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card md className="border-0">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <img src={time} alt="" width={70} height={70} />
                        <Card.Title className="text-center">Timely Service</Card.Title>
                        <Card.Text className="text-center">
                        Our passenger transportation company ensures timely and efficient service, so you can reach your destination quickly and on time. We understand the importance of time and work tirelessly to provide efficient transportation solutions for our clients
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card md className="border-0">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <img src={safe} alt="" width={70} height={70} />
                        <Card.Title className="text-center">Reliability and safety</Card.Title>
                        <Card.Text className="text-center">
                        Our reliable service has earned us a reputation for excellence in the industry. With years of experience and a commitment to quality, we ensure that every trip is smooth and stress-free for our passengers. We have implemented strict safety measures and protocols to ensure a secure and comfortable journey for everyone.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default Features;
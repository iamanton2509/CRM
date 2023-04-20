import Features from './../components/Features';
import {Container} from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
            <h1 className="text-center mt-4" style={{color: 'rgb(25, 135, 84)'}}>Welcome to our "Passenger Transportation CRM"</h1>
            <p className="text-center" style={{lineHeight: 1.5, fontWeight: 500}}>We are thrilled to have you onboard. As a registered user, you will now have access to a range of powerful tools that will help you streamline your transport management and make the most of your resources. With our advanced analytics and reporting features, you can gain valuable insights into your business performance and optimize your operations for maximum efficiency.
            Our platform is designed with your needs in mind, so you can easily manage your passenger transport business from one central location. Whether you need to track your fleet, monitor driver performance or handle customer bookings, we have everything you need to stay organized and stay ahead of the competition. And with our user-friendly interface and intuitive navigation, you'll find it a breeze to get started.
            At our Passenger Transport CRM, we are committed to providing you with the highest level of support and service. Our team of experts is always on hand to answer any questions you may have and help you make the most of our platform. We pride ourselves on our customer-centric approach and are dedicated to your success.
            So, what are you waiting for? Let's get started and take your passenger transport business to the next level with our powerful CRM platform. Thank you for choosing us as your partner in success!</p>
            <Features />
        </Container>
    );
}

export default Home;
import {useState, useEffect} from 'react';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {Table, Container, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Schedule = () => {
    const db = getFirestore();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const getTrips = async () => {
            const tripsRef = collection(db, 'trips');
            const snapshot = await getDocs(tripsRef);
            const tripsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTrips(tripsList);
        }
        getTrips();
    }, []);

    return (
        <Container>
            <h3 className="text-center mt-4 mb-4" style={{color: 'rgb(25, 135, 84)', fontWeight: 600}}>Scheduled trips</h3>
            {trips.length === 0 ? 
            <Container className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
            </Container>
            :    
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">From</th>
                        <th className="text-center">To</th>
                        <th className="text-center">Number of passengers</th>
                        <th className="text-center">Car Number</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => 
                        <tr key={trip.id}>
                            <td className="text-center">{trip.from}</td>
                            <td className="text-center">{trip.to}</td>
                            <td className="text-center">{trip.passengers}</td>
                            <td className="text-center">{trip.carNumber}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            }
        </Container>
    );
}

export default Schedule;
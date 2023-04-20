import {useEffect, useState} from 'react';
import {getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';
import {Table, Container, Form, Spinner, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Trips = () => {
    const db = getFirestore();
    const [trips, setTrips] = useState([]);
    const [carNumber, setCarNumber] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [passengers, setPassengers] = useState('');

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
    
    const createTrip = async (carNumber, from, to, passengers) => {
        try {
            const tripRef = collection(db, "trips");
            const newTripDoc = await addDoc(tripRef, {
                carNumber: carNumber,
                from: from,
                to: to,
                passengers: passengers
            });
            console.log("New trip created with ID: ", newTripDoc.id);
            return newTripDoc.id;
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createTrip(carNumber, from, to, passengers);
        setCarNumber("");
        setFrom("");
        setTo("");
        setPassengers("");
    };
      
    return (
        <Container>
            <h1 className="text-center mt-4 mb-4" style={{color: 'rgb(25, 135, 84)', fontWeight: 600}}>Trips schedule</h1>
            <Container className="d-flex justify-content-center align-items-center" style={{width: 500, minHeight: 600, border: '1px solid black', padding: 25}}>
                <div>
                    <h3 className="text-center">Add trip to the schedule</h3>
                    <Form onSubmit={handleSubmit} className="d-flex flex-column" autoComplete="off">
                        <Form.Control
                            value={carNumber}
                            onChange={e => setCarNumber(e.target.value)}
                            type="text"
                            placeholder="Enter car number"
                            className="mb-2"
                        />
                        <Form.Control
                            value={from}
                            onChange={e => setFrom(e.target.value)}
                            type="text"
                            placeholder="Enter starting location" 
                            className="mb-2" 
                        />    
                        <Form.Control
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            type="text"
                            placeholder="Enter destination"
                            className="mb-2"
                        />     
                        <Form.Control
                            value={passengers}
                            onChange={e => setPassengers(e.target.value)}
                            type="text"
                            placeholder="Enter number of passengers"
                            className="mb-2"
                        />
                        <Button variant="primary" type="submit" className="mb-5">
                            Create Trip
                        </Button>
                    </Form>
                    <h3 className="text-center">Scheduled trips</h3>

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
                </div>
            </Container>
        </Container>
    );
}

export default Trips;
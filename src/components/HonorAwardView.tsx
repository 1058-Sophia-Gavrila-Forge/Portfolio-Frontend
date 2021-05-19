import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import '../css/HonorAwards.css'

interface Honor {
    id: string;
    description: string;
    dateReceived: string;
    receivedFrom: string;
    title: string;
}

const HonorAwardView = () => {
    const [honorList, setHonor] = useState<Honor[]>();

    useEffect(() => {
        axios.get('http://3.236.213.150:8081/honor').then(response => {
            console.log(response.data);
            setHonor(response.data);
        })
    }, [null]);

    const renderHonors = ((honorList: Honor[]) => {
        return honorList.map(data => {
            const date = new Date(data.dateReceived).toLocaleString('default',{ day:"numeric", month: 'long', year: 'numeric'});
            return (
                <div className="card">
                    <div className="card-body">
                        <h3>{data.title}</h3>
                        <p style={{ color: "rgb(144, 164, 175)"}}>{data.description}</p>
                        <h5 style={{ display: "inline" }}>Received From:</h5> {data.receivedFrom} <br />
                        <h5 style={{ display: "inline" }}>Received On:</h5>{date}
                    </div>
                </div>
            );
        });
    })

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header-honoraward">
                    <h4>Honors and Awards</h4>
                </Card.Header>
                <Card.Body>
                    {honorList && renderHonors(honorList)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default HonorAwardView;
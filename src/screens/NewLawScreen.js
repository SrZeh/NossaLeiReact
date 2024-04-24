import React from 'react';
import '../style/styles.css';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';


function NewLawScreen() {
    return (
        <div className="App">
            <Header />
            <div style={{ padding: 30 }}>
                <Form />
                <Table />
            </div>
        </div>
    );
}

export default NewLawScreen;
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/peopleDB', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: String,
    id: String,
    date: String,
    age: Number,
    gender: String,
    email: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    fitnessData: {
        steps: Number,
        calories: Number,
        workoutType: String
    }
});

const Person = mongoose.model('people', personSchema);

const people = [
    {
        name: 'Lavesh Gaur',
        id: '103',
        date: '2025-03-02',
        age: 26,
        gender: 'Male',
        email: 'lavesh.gaur@example.com',
        phone: '+911234567890',
        address: { street: '789 Oak St', city: 'Delhi', state: 'DL', country: 'India' },
        fitnessData: { steps: 9000, calories: 500, workoutType: 'Cycling' }
    },
    {
        name: 'Priyanshu Kumar',
        id: '104',
        date: '2025-03-02',
        age: 24,
        gender: 'Male',
        email: 'priyanshu.kumar@example.com',
        phone: '+918765432109',
        address: { street: '567 Pine St', city: 'Patna', state: 'BR', country: 'India' },
        fitnessData: { steps: 7500, calories: 350, workoutType: 'Running' }
    },
    {
        name: 'Rahul Kumawat',
        id: '105',
        date: '2025-03-02',
        age: 27,
        gender: 'Male',
        email: 'rahul.kumawat@example.com',
        phone: '+917654321098',
        address: { street: '234 Birch St', city: 'Jaipur', state: 'RJ', country: 'India' },
        fitnessData: { steps: 8200, calories: 420, workoutType: 'Swimming' }
    },
    {
        name: 'Abhishek Verma',
        id: '106',
        date: '2025-03-02',
        age: 25,
        gender: 'Male',
        email: 'abhishek.verma@example.com',
        phone: '+919876543210',
        address: { street: '123 Cedar St', city: 'Lucknow', state: 'UP', country: 'India' },
        fitnessData: { steps: 8900, calories: 480, workoutType: 'Gym' }
    },
    {
        name: 'Shubham Yadav',
        id: '107',
        date: '2025-03-02',
        age: 26,
        gender: 'Male',
        email: 'shubham.yadav@example.com',
        phone: '+919123456789',
        address: { street: '345 Maple St', city: 'Kanpur', state: 'UP', country: 'India' },
        fitnessData: { steps: 7800, calories: 390, workoutType: 'Hiking' }
    }
];

// Insert into MongoDB
Person.insertMany(people)
    .then(() => {
        console.log('✅ New people added to database');
        mongoose.connection.close();
    })
    .catch((err) => console.log('❌ Error inserting data:', err));
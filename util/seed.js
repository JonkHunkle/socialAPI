const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomEmail, getRandomThought } = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    const users = [];
    const thoughts = []

    for (let i = 0; i < 20; i++) {
        var username = getRandomName();
        var email = getRandomEmail()
        var thoughtText = getRandomThought()
        thoughts.push({ username, thoughtText })
        users.push({
            username,
            email,
        });
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts)
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});

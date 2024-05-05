import express from "express";
import bcrypt from "bcrypt";

const saltRounds = 10;

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'Thiago',
            email: 'thiago@tvdieten.com',
            password: '$2b$10$Z/5ejhMbJno3Wl5Gn4/QU.uYI97fxqqgHDaNnLVzc2LIOGMZh5m2K', // password: password
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: '$2b$10$q0BwW2yQbTZebynJJ4wMoOoRLI2CDgn4UvnoZTDPZgrZSQIoGmHQu', // password: bananas
            entries: 0,
            joined: new Date()
        }
    ]
};

function findUser(id) {
    let returnUser;
    id = id.toString();
    const userFound = database.users.some((user, index, array) => {
        if (user.id === id) {
            returnUser = array[index];
            return true;
        }
    });
    console.log(userFound, returnUser);
    return { userFound, returnUser };
}

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //temporarily allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
    next(); 
});

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', async (req, res) => {
    console.log(req.body);

    const passwordMatch = await bcrypt.compare(req.body.password, database.users[0].password);
    if (req.body.email === database.users[0].email &&
        passwordMatch) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }

});

app.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: hash,
        entries: 0,
        joined: new Date()
    });

    res.json({
        'message': `User ${name} registered successfully`,
        'user': database.users[database.users.length - 1]
    });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    var { userFound, returnUser } = findUser(id);

    userFound ? res.json(returnUser) : res.status(404).json('User not found');
});

app.put('/image', (req, res) => {
    var { id } = req.body;
    var { userFound, returnUser } = findUser(id);

    if (userFound) {
        returnUser.entries++;
        res.json(returnUser.entries);
    } else {
        res.status(404).json('User not found');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


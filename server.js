const express = require('express');
const server = express();

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));

const nunjucks = require('nunjucks');

nunjucks.configure('./', {
    express: server,
    noCache: true,
});

const donors = [
    {
        name: "Matheus Gomes",
        blood: "A+"
    },
    {
        name: "Mayk Brito",
        blood: "A-"
    },
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Robson Marques",
        blood: "B+"
    }
];

server.get('/', (req, res) => {
    const lastFourDonorsView = donors.slice(Math.max(donors.length - 4, 0))
    return res.render('index.html', { donors: lastFourDonorsView });
});

server.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    donors.push({
        name,
        blood,
    });

    return res.redirect('/');
})

server.listen(3000, (req, res) => {
    console.log('Server started');
});




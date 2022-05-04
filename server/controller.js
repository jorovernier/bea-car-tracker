let cars = [];

let id = 1;

module.exports = {
    getFortune: (req, res) => {
        const fortunes = 
        ["A lifetime friend shall soon be made into a car.",
         "A lifetime of happiness lies ahead of you, in the shape of a car.",
         "A golden egg of opportunity falls into your car this month.",
         "A gambler not only will lose what car he has, but also will lose what car he doesn't have.",
         "Any day above ground, in a car, is a good day."
        ];
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
        res.status(200).send(randomFortune);
    },
    addCar: (req, res) => {
        const {make, model, year, color} = req.body;
        let newCar = {
            id,
            make: make.charAt(0).toUpperCase() + make.slice(1),
            model: model.charAt(0).toUpperCase() + model.slice(1),
            year,
            color: color.charAt(0).toUpperCase() + color.slice(1)
        }
        cars.push(newCar);
        id++;
        res.status(200).send(newCar);
    },
    editCar: (req, res) => {
        const carID = req.params.id;
        let index = carID-1;
        const {field, content} = req.body;
        cars[index][field] = content.charAt(0).toUpperCase() + content.slice(1);
        let newContent = cars[index][field];
        res.status(200).send(newContent);
    },
    deleteCar: (req, res) => {
        const carID = req.params.id;
        let index = carID-1;
        cars.splice(index, 1);
        res.status(200).send('Car deleted.');
    }
}
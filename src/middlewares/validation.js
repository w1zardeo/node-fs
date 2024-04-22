exports.validateUser = (req, res, next) => {
    const {name, email, phone, age} = req.body;
    if (!name || !email || !phone || !age) {
        return res.status(400).json({message: 'All fields are required'});
    }
    if (typeof age !== 'number' || age < 1) {
        return res.status(400).json({message: 'Age must be a positive number'})
    }
    next();
}

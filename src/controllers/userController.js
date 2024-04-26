let users = [];

// Get all Users
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  const user = users.find((user) => user.id === parseInt(userId));
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404).json({ message: `Not found user with id ${userId}` });
  }
};

// Create new user
exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update user
exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));
  if (userIndex !== -1) {
    users[userIndex] = {
      id: parseInt(userId),
      name: req.body.name || users[userIndex].name,
      email: req.body.email || users[userIndex].email,
      phone: req.body.phone || users[userIndex].phone,
      age: req.body.age || users[userIndex].age,
    };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({message: `Not found user with id ${userId}`})
  }
};

// Delete user
exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    const userIndex = users.findIndex(user => user.id === parseInt(userId));
    console.log(userIndex);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).json();
    } else {
        res.status(404).json({message: `Not found user with id ${userId}`})
    }
}

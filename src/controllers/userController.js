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
  const { name, email, phone, age } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    age,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update user
exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const userToUpdate = users.find((user) => user.id === parseInt(userId));

  if (userToUpdate) {
    userToUpdate.name = req.body.name || userToUpdate.name;
    userToUpdate.email = req.body.email || userToUpdate.email;
    userToUpdate.phone = req.body.phone || userToUpdate.phone;
    userToUpdate.age = req.body.age || userToUpdate.age;

    res.status(200).json(userToUpdate);
  } else {
    res.status(404).json({ message: `Not found user with id ${userId}` });
  }
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  const userIndex = users.findIndex(user => user.id === parseInt(userId));

  if (userIndex !== -1) {
      users = users.filter((user, index) => index !== userIndex);
      res.status(204).json();
  } else {
      res.status(404).json({ message: `Not found user with id ${userId}` });
  }
};

const bcrypt = require('bcrypt');

const password = 'password456';
const saltRounds = 10; // You can adjust the number of rounds as needed

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hashed Password:", hash);
});

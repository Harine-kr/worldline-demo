const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee-management'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
  
    console.log('Connected to database');
  });

  app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`

    <h1>Employee Management App</h1>
    <p>Welcome to the employee management app. Please fill out the form below to submit your details.</p>
    <form method="POST" action="/submit">

    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br>

    <label for="mobile">Phone Number:</label>
    <input type="int" id="mobile" name="mobile"><br>

    <label for="gender">Gender:</label>
    <select id="gender" name="gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select><br>

    <label for="qualification">Qualification:</label>
    <input type="text" name="qualification" id="qualification">

    <label for="Joining date:"></label>
    <input type="date" name="joining_date" id="joining_date">

    <label for="prev_yoe">Expreience in previous company</label>
    <input type="int" name="prev_yoe" id="prev_yoe">

    <button type="submit">Submit</button>
  </form>
    `);
  });

  app.post('/submit', (req, res) => {
    const {name,email,mobile,gender,qualification,joining_date,prev_yoe} = req.body;
    const sql = `
      INSERT INTO employee-management ("${name}","${email}","${mobile}","${gender}","${qualification}","${joining_date}","${prev_yoe}")
      VALUES (name,email,mobile,gender,qualification,joining_date,prev_yoe);
    `;
  
    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error inserting student: ', err);
        res.send('Error submitting employee details. Please try again.');
        return;
      }

      res.send(`
      <h1>Employee Details Submitted</h1>
      <p>First Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone Number: ${phone}</p>
      <p>Date of Birth: ${dob}</p>
      <p>Gender: ${gender}</p>
      <p>Qualification: ${qualification}</p>
      <p>Joining date: ${joining_date}</p>
      <p>Preveious Work Experience: ${prev_yoe}</p>
      `)
  });});
  
  
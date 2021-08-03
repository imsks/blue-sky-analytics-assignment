import app from './app';
import configEnv from './config';
import {
  createDatabase,
  createTable,
  setCleanedDataToJson,
  setSourceDataToJSON,
} from './database-modules';
import connection from './database/DatabaseConfig';
import { cleanDataFromSource } from './utils';

// // In production we won't need this as we'll already have the cleaned data it JSON
// connection.connect(error => {
//   if (error) throw error;

//   console.log('MySQL Connected!');

//   // 1. Creates database if not created
//   createDatabase();

//   // 2. Creates table if not created
//   createTable();

//   // 3. Parses data from CSV and put into database table => ONE TIME ONLY
//   cleanDataFromSource();

//   // 4. Get whole source data in stuctured format in JSON file
//   setSourceDataToJSON();

//   // 5. Saves cleaned data into JSON file
//   setCleanedDataToJson();
// });

connection.serialize(() => {
  // 2. Creates table if not created
  createTable();

  // 3. Parses data from CSV and put into database table => ONE TIME ONLY
  cleanDataFromSource();

  connection.each('SELECT * FROM mytable', (error, rows) => {
    if (error) throw error;

    console.log(rows);
  });

  // connection.each('SELECT * FROM mytable', function(err, row) {
  //   console.log(row);
  // });

  // // 4. Get whole source data in stuctured format in JSON file
  // setSourceDataToJSON();

  // // 5. Saves cleaned data into JSON file
  // setCleanedDataToJson();
});

// connection.close();

const PORT = configEnv.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

SQLite.enablePromise(true);
const dbPath = `${RNFS.DocumentDirectoryPath}/addresses.db`;

export const openDatabase = async () => {
  const db = await SQLite.openDatabase({
    name: dbPath,
    location: 'default',
    createFromLocation: 1,
  });
  console.log('Database opened successfully');
  return db;
};

export const fetchAddress = async () => {
  const db = await openDatabase();
  try {
    console.log('fetching...');

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM addresses where latitude=?',
        ['14.7418267'],
        (tx, results) => {
          const rows = results.rows;
          console.log(rows.item(0));
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

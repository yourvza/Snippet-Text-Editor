import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//using try in order to see errors
export const putDb = async (content) => {
  try {
    // need to open the database in order to accesss and update
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ jate: content });
    const result = await request;

    // Log success message with the result
    console.log("Data saved to the database", result);
  } catch (error) {
    console.error("Error saving data to the database", error);
    throw error;
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Function to retrieve all content from the 'jate' object store in IndexedDB
export const getDb = async () => {
  try {
    // OpenDATATbase
    const db = await openDB("jate", 1);
    // Start a readonly transaction while also getting and storing
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStatae("jate");
    const request = store.getAll();
    const result = await request;

    console.log(result);

    return result;
  } catch (error) {
    // Log any errors that occur during database operations
    console.error("Error retrieving data from the database", error);
    throw error; // Optionally rethrow the error for further handling
  }
};
initdb();

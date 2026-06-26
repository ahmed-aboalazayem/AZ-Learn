const DB_NAME = "AZ_Learn_DB";
const DB_VERSION = 1;

let dbInstance = null;

/**
 * Initialize IndexedDB and open connection.
 */
export function initDB() {
    if (dbInstance) return Promise.resolve(dbInstance);

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error("Database failed to open:", event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // 1. Courses object store
            if (!db.objectStoreNames.contains("courses")) {
                db.createObjectStore("courses", { keyPath: "id" });
            }

            // 2. Notes object store
            if (!db.objectStoreNames.contains("notes")) {
                db.createObjectStore("notes", { keyPath: "id" });
            }

            // 3. User accounts store
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", { keyPath: "email" });
            }

            // 4. Session & Config store
            if (!db.objectStoreNames.contains("session")) {
                db.createObjectStore("session", { keyPath: "key" });
            }
        };
    });
}

/**
 * Helper to get a transaction store.
 */
function getStore(storeName, mode = "readonly") {
    return initDB().then((db) => {
        return new Promise((resolve) => {
            const transaction = db.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
            resolve(store);
        });
    });
}

/* ==========================================================================
   Courses CRUD
   ========================================================================== */

export function getDbCourses() {
    return getStore("courses").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    });
}

export function saveDbCourse(course) {
    return getStore("courses", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.put(course);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}

export function deleteDbCourse(id) {
    return getStore("courses", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    });
}

/* ==========================================================================
   Notes CRUD
   ========================================================================== */

export function getDbNotes() {
    return getStore("notes").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    });
}

export function saveDbNote(note) {
    return getStore("notes", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.put(note);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}

export function deleteDbNote(id) {
    return getStore("notes", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    });
}

/* ==========================================================================
   Users (Accounts) CRUD
   ========================================================================== */

export function getDbUser(email) {
    return getStore("users").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.get(email);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);
        });
    });
}

export function saveDbUser(user) {
    return getStore("users", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.put(user);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    });
}

/* ==========================================================================
   Session / Configuration CRUD
   ========================================================================== */

export function getDbSession(key) {
    return getStore("session").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result ? request.result.value : null);
            request.onerror = () => reject(request.error);
        });
    });
}

export function saveDbSession(key, value) {
    return getStore("session", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.put({ key, value });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    });
}

export function deleteDbSession(key) {
    return getStore("session", "readwrite").then((store) => {
        return new Promise((resolve, reject) => {
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    });
}

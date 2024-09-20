Jessedev1 Cleaner
===============
Based on [xolvio:cleaner](https://github.com/xolvio/cleaner)

This package cleans your database for testing purposes.

# Installation

```
meteor add jessedev:cleaner
```

# Usage

resetDatabase only resets your database when it is executed inside a debugOnly environment.

You can clear your database with `resetDatabase(options, callback)`. It works on both the client and the server.

```javascript
import { resetDatabase } from 'meteor/jessedev:cleaner';

// delete all collections with optional callback
resetDatabase(null, callback);
```

## Provide specific database instance
```javascript
// delete all collections except myCollection with optional callback
resetDatabase({db: yourDatabaseInstance}, callback);
```

## Don't reset certain collection
```javascript
// delete all collections except myCollection with optional callback
resetDatabase({excludedCollections: ['myCollection']}, callback);
```

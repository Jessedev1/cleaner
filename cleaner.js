if (Meteor.isServer) {
  const _resetDatabase = function (options) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error(
        'resetDatabase is not allowed outside of a development mode. ' +
        'Aborting.'
      );
    }

    options = options || {};
    var excludedCollections = ['system.indexes'];
    if (options.excludedCollections) {
      excludedCollections = excludedCollections.concat(options.excludedCollections);
    }

    var db = options.db || MongoInternals.defaultRemoteCollectionDriver().mongo.db;
    var getCollections = Meteor.wrapAsync(db.collections, db);
    var collections = getCollections();
    var appCollections = _.reject(collections, function (col) {
      return col.collectionName.indexOf('velocity') === 0 ||
        excludedCollections.indexOf(col.collectionName) !== -1;
    });

    _.each(appCollections, function (appCollection) {
      var deleteMany = Meteor.wrapAsync(appCollection.deleteMany, appCollection);
      deleteMany({}, {});
    });
  };

  Meteor.methods({
    'jessedev:cleaner/resetDatabase': function (options) {
      _resetDatabase(options);
    }
  });

  resetDatabase = function(options, callback) {
    _resetDatabase(options);
    if (typeof callback === 'function') { callback(); }
  }

}
if (Meteor.isClient) {
  resetDatabase = function(options, callback) {
    Meteor.call('jessedev:cleaner/resetDatabase', options, callback);
  }
}

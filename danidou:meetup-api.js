_.extend(Meetup, {
  server: 'https://api.meetup.com',

  _getApiKey: function(options) {
    options = options || {};

    if (!Meteor.settings.meetupApi) {
      Log.warn('Missing API key in settings.js');
      return {};
    }

    return {
      key: Meteor.settings.meetupApi, 
      signed: true
    }
  },

  _getUrl: function(resource) {
    return [Meetup.server, resource].join('/');
  },

  _call: function(method, resource, params, options) {
    var url = this._getUrl(resource);

    var config = ServiceConfiguration.configurations.findOne();
    if (config) {
      params = _.extend(params || {}, {
        sign: true,
        key: config.clientId
      });
    }

    params = _.extend(params || {}, this._getApiKey(options));

    try {
      var result = HTTP.call(method, url, {
        params: params
      }).data;
    }
    catch (e) {
      Log.warn(e.toString());
    }
    return result;
  },

  get: function() {
    return Meetup._call.apply(Meetup, _.union(['GET'], arguments));
  },
  post: function() {
    return Meetup._call.apply(Meetup, _.union(['POST'], arguments));
  },
  put: function() {
    return Meetup._call.apply(Meetup, _.union(['PUT'], arguments));
  },
  del: function() {
    return Meetup._call.apply(Meetup, _.union(['DELETE'], arguments));
  }
});

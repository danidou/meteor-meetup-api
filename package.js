Package.describe({
  summary: "Meetup API using Meetup API key.",
  version: "1.0.0",
  git: "https://github.com/danidou/meteor-meetup-api"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use('http', 'server');
  api.use('underscore', 'server');

  api.export('Meetup', 'server');

  api.addFiles('danidou:meetup-api.js', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest', 'server');
  api.use('danidou:meetup-api', 'server');
  api.addFiles('danidou:meetup-api-tests.js', 'server');
});

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./awsconfig.json');
var exec = require('child_process').exec,
    child;

child = exec('react-scripts start {{args}}',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
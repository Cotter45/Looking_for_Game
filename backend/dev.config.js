module.exports = {
  apps : [{
    name: 'lfg_api',
    script: 'bin/www',
    node_args : '-r dotenv/config',
    watch: '.',
    instances: '4',
    exec_mode: 'cluster'
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

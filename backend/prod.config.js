module.exports = {
  apps : [{
    name: 'lfg_api',
    script: 'bin/www',
    node_args : '-r dotenv/config',
    watch: '.',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};

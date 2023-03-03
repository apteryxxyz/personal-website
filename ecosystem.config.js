const script = process.platform === 'win32'
    ? './scripts/npm.js' : 'npm';

module.exports = [
    {
        name: 'Personal Website',
        script,
        args: 'start',
        instances: 1,
        autorestart: true,
        watch: false,
    },
];

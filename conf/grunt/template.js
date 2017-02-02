module.exports = {
    options: {
        data: {
            recaptcha:'<%= recaptcha %>'
        }
    },
    www: {
        files: {
            'dist/index.html': 'src/www/index.html'
        }
    }
};

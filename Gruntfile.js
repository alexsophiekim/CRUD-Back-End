module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
        files: ['js/*.js', 'js/!*.min.js'],
        options: {
            esversion: 6
        }
    },




    //Sophie Hinting untill here//



    //Riss Compile SASS untill here//



    //Matt Linting untill here//

  });
    grunt.loadNpmTasks('grunt-contrib-jshint');


    //Sophie Hinting untill here//


    //Riss Compile SASS untill here//



    //Matt Linting untill here//

   grunt.registerTask('checkJS', ['jshint']);



    //Sophie Hinting untill here//


    //Riss Compile SASS untill here//



    //Matt Linting untill here//

}

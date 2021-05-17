'use strict';
const sass = require('node-sass');
module.exports = function (grunt) {

  grunt.config.set('src', '');
  grunt.config.set('dist', '../');
  grunt.config.set('useRootPath', false);

  grunt.initConfig({

    conf: {
      src: grunt.config.get('src'),
      dist: grunt.config.get('dist')
    },

    pug: {
      html: {
        options: {
          pretty: true,
          spawn: false,
          data: {
            debug: true
          }
        },
        files: [{
          expand: true,
          cwd: '<%= conf.src %>pug',
          src: ['**/*.pug', '!_layouts/**', '!_parts/**', '!_mixins/**'],
          dest: '<%= conf.dist %>',
          ext: '.html'
        }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass/',
          src: ['**/*.sass'],
          dest: '../css/',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        map: true,
        browsers: ['last 4 version']
      },
      dist: {
        src: '../css/*.css'
      }
    },

    prettier: {
      files: {
        src: ['<%= conf.dist %>js/scripts.js']
      }
    },

    kraken: {
      options: {
        key: '0f6da8af33d4f776c01b858348f71ad0',
        secret: '8ad11721c57245df8590842addd5250fdde5d6b7',
        lossy: true
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= conf.dist %>img',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= conf.dist %>img_min'
        }]
      }
    },

    copy: {
      js: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>js',
          src: ['*.js'],
          dest: '<%= conf.dist %>js'
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>img',
          src: ['**/*.svg'],
          dest: '<%= conf.dist %>img'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>sass/fonts',
          src: ['**/*'],
          dest: '<%= conf.dist %>css/fonts'
        }]
      }
    },

    clean: {
      options: {
        force: true
      },
      files: [
        '<%= conf.dist %>**/*.html',
        '<%= conf.dist %>css',
        '<%= conf.dist %>js',
        // '<%= conf.dist %>img',
        '!<%= conf.dist %>.git/**',
        '!<%= conf.dist %>dev/**',
        '!<%= conf.dist %>wp/**',
        '!<%= conf.dist %>node_modules/**'
      ]
    },

    browserSync: {
      dev: {
        options: {
          watchTask: true,
          server: grunt.config.get('useRootPath') ? '<%= conf.dist %>' : '<%= conf.dist %>..',
          startPath: grunt.config.get('useRootPath') ? '<%= conf.dist %>' : process.cwd().replace(/\\/g, '/').split('/').reverse()[1],
          files: ['<%= conf.dist %>**/*.{html,css,js}', '!<%= conf.src %>'],
        }
      }
    },

    watch: {
      pug: {
        files: ['<%= conf.src %>pug/**/*.pug'],
        tasks: ['pug-newer']
      },
      pugCommon: {
        files: ['<%= conf.src %>pug/_{layouts,parts}/*.pug'],
        tasks: ['pug']
      },
      sass: {
        files: ['<%= conf.src %>sass/**/*.sass'],
        tasks: ['sass','autoprefixer']
      },
      js: {
        files: ['<%= conf.src %>js/*.js'],
        tasks: ['copy:js', 'prettier', 'eslint']
      }
    },

    validation: {
      options: {
        reset: true,
        stoponerror: false,
        generateReport: false,
        reportpath: false
      },
      files: {
        src: [
          '<%= conf.dist %>**/*.html',
          '!<%= conf.dist %>dev/**',
          '!<%= conf.dist %>wp/**',
          '!<%= conf.dist %>node_modules/**'
        ]
      }
    },

    htmllint: {
      defaultOptions: {
        options: {
          'attr-bans': ['align', 'background', 'bgcolor', 'border', 'frameborder', 'longdesc', 'marginwidth', 'marginheight', 'scrolling', 'style'],
          'attr-name-style': 'dash',
          // 'attr-order': 'class, id, name, data-*, src, for, type, href, value, title, alt, role, aria-*',
          'attr-req-value': false,
          'doctype-first': true,
          'doctype-html5': true,
          'force': true,
          'id-class-no-ad': false,
          'id-class-style': 'dash',
          'indent-style': 'spaces',
          'indent-width': 2,
          'line-end-style': false,
          'tag-bans': ['style'],
        },
        src: [
          '<%= conf.dist %>**/*.html',
          '!<%= conf.dist %>dev/**',
          '!<%= conf.dist %>wp/**',
          '!<%= conf.dist %>node_modules/**'
        ]
      }
    },

    csslint: {
      all: {
        options: {
          'adjoining-classes': false,
          'box-model': false,
          'box-sizing': false,
          'compatible-vendor-prefixes': false,
          'display-property-grouping': false,
          'duplicate-background-images': false,
          'fallback-colors': false,
          'floats': false,
          'font-sizes': false,
          'force': true,
          'gradients': false,
          'ids': false,
          'import': 1,
          'important': false,
          'known-properties': false,
          'order-alphabetical': false,
          'outline-none': false,
          'overqualified-elements': false,
          'qualified-headings': false,
          'selector-newline': false,
          'star-property-hack': false,
          'text-indent': false,
          'unique-headings': false,
          'universal-selector': false,
          'unqualified-attributes': false,
          'vendor-prefix': 2,
          'zero-units': false
        },
        src: ['<%= conf.dist %>css/**/*.css']
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc',
        format: 'stylish',
        failOnError: false,
        fix: true
      },
      target: ['<%= conf.dist %>js/scripts.js']
    },

    fclint: {
      html: {
        options: {
          spelling: true,
          nodoublebr: true
        },
        files: {
          src: [
            '<%= conf.dist %>**/*.html',
            '!<%= conf.dist %>.git/**',
            '!<%= conf.dist %>node_modules/**',
            '!<%= conf.dist %>dev/**',
            '!<%= conf.dist %>wp/**',
            '!<%= conf.dist %>node_modules/**'
          ]
        }
      }
    },

    naming: {
      html: {
        files: {
          src: [
            '<%= conf.dist %>**/*.html',
            '!<%= conf.dist %>.git/**',
            '!<%= conf.dist %>dev/**',
            '!<%= conf.dist %>wp/**',
            '!<%= conf.dist %>node_modules/**'
          ]
        }
      }
    },

    shell: {
      lighthouse_desktop: {
        command: 'npm run lighthouse -- ' + grunt.option('url') + ' --only-categories=performance --emulated-form-factor=desktop --view --output-path=./lighthouse-desktop-status.html'
      },
      lighthouse_mobile: {
        command: 'npm run lighthouse -- ' + grunt.option('url') + ' --only-categories=performance --emulated-form-factor=mobile --view --output-path=./lighthouse-mobile-status.html'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-htmllint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.loadTasks('tasks');

  grunt.registerTask('pug-newer', ['newer:pug']);

  grunt.registerTask('default', [
    'clean',
    'pug',
    'sass',
    'autoprefixer',
    'copy:js',
    'prettier',
    'copy:fonts',
    'lint',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('quick', [
    'pug',
    'sass',
    'autoprefixer',
    'copy:js',
    'prettier',
    'eslint',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('lint', [
    'validation',
    'htmllint',
    'csslint',
    'eslint',
    'fclint'
  ]);

  grunt.registerTask('imagemin', [
    'kraken'
  ]);

  grunt.registerTask('psi', function (device) {
    if (device === 'sp') {
      grunt.task.run('shell:lighthouse_mobile');
    } else if (device === 'pc') {
      grunt.task.run('shell:lighthouse_desktop');
    } else {
      grunt.task.run(['shell:lighthouse_mobile', 'shell:lighthouse_desktop']);
    }
  });

};
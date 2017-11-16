const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator  {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  initializing(){
    this.log('nkrop - Generating Auth')
  }

  prompting(){}

  configuring(){}

  writing(){

    this._writeStaticFiles()
  }

  install(){
    console.log('installing packages...')
    this.npmInstall([
      'passport',
      'passport-local',
      'cookie-session',
      'cookie-parser',
      'objection',
      'objection-password'], { 'save': true, 'save-exact': true });
  }

  end(){
    console.log(`   ${chalk.yellow('Completion steps:')}`)
    console.log('')
    console.log('     (1) Create migration for users (with email + password columns)')
    console.log('     (2) Configure cookieSession, cookieParser, passport middleware in `server.js`')
    console.log
    console.log('')

  }

  _writeStaticFiles(){
    const userModelSrc = this.templatePath('./models/User.js')
    const userModelDest = this.destinationPath('./src/models/User.js')
    this.log('Populating', userModelDest)
    this.fs.copyTpl(userModelSrc, userModelDest)

    const authControllerSrc = this.templatePath('./controllers/authController.js')
    const authControllerDest = this.destinationPath('./src/controllers/authController.js')
    this.fs.copyTpl(authControllerSrc, authControllerDest)


    const authRouterSrc = this.templatePath('./routers/authRouter.js')
    const authRouterDests = this.destinationPath('./src/routers/authRouter.js')
    this.fs.copyTpl(authRouterSrc, authRouterDests)


    const helpersSrc = this.templatePath('./helpers')
    const helpersDest = this.destinationPath('./src/helpers')
    this.fs.copy(helpersSrc, helpersDest)


    const middlewareSrc = this.templatePath('./middleware')
    const middlewareDest = this.destinationPath('./src/middleware')
    this.fs.copy(middlewareSrc, middlewareDest)

  }


}

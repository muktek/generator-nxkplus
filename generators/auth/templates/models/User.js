const { Model } = require('objection');
const Password = require('../helpers/auth--objection-password.js')();
const validateInput = require('../helpers/auth--objection-validate-input.js')



class User extends Password(Model) {

  static get tableName (){
    return 'users'
  }

  $validate(modelInstance){
    validateInput(modelInstance)
    return modelInstance
  }

  static get relationMappings(){
    return {

    }
  }
}



module.exports = User




// FXR
// Firebase Auth
// login, register

// first check
FXR.auth={
  init: function(){
    console.log('firebase init..');
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        if(localStorage.name){
          FXR.auth.update_name(localStorage.name)
          localStorage.removeItem('name');
          firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email sent.
            console.log('email sent!')
            FXR.user=user;
            getIn();
            FXR.data.init();
          }, function(error){alert(error)});
        }else{
          FXR.user=user;
          getIn();
          FXR.data.init();
        }
      }else{
        getOut()
      }
    });
  },
  register: function(name,email,password){
    localStorage.name=name;
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
      $('#register > .info').text(error.message)
      $('#r-register').text('Register')
      console.log('registered')
    });
  },
  signin: function(email,password){
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error){
      $('#login > .info').text(error.message)
      $('#l-login').text('Login')
      console.log('signed in')
    });
  },
  signout: function(){
    firebase.auth().signOut().then(function(){
      console.log('signed out')
    }, function(error){
      console.log(error.message)
    });
  },
  update_name: function(name){
    firebase.auth().currentUser.updateProfile({displayName:name}).then(function() {
      genAccount()
    }, function(error) {
      $('#main-account .info').text(error.message)
    });
  },
  update_email: function(email){
    firebase.auth().currentUser.updateEmail(email).then(function() {
      genAccount()
      $('#warn').css({display:'inline-block'})
    }, function(error) {
      $('#main-account .info').text(error.message)
    });
  },
  reset: function(email,callback,el){
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
      callback(el);
    }, function(error) {
      alert(error.message)
    });
  }
} //..

FXR.auth.init();






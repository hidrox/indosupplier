


// FXR
// Firebase Data
// storage, database

FXR.sg = firebase.storage();
FXR.db = firebase.database();


FXR.data={
  init: function(){
    if(FXR.user.emailVerified===false){
      $('#warn').css({display:'inline-block'})
      return false
    }
    FXR.db.ref('iklan/'+FXR.user.uid).on('value', function(data) {
      data.val() && genIklan(data.val());
    });
  },
  upload_sg: function(path,blob,cb){
    var uploadTask = FXR.sg.ref().child(FXR.user.uid+'/'+path).put(blob);
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress+'%')
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.log(error.message)
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      console.log('upload finished.')
      cb(uploadTask.snapshot.downloadURL)
    });
  },
  update_sg: function(uid,path){
    var forestRef = FXR.sg.child(uid+path);
    var newMetadata = {
      contentType: 'text/plain'
    }
    forestRef.updateMetadata(newMetadata).then(function(metadata) {
      console.log(metadata)
      // Updated metadata for 'images/forest.jpg' is returned in the Promise
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  },
  download_sg: function(uid,path){
    var starsRef = FXR.sg.child(uid+path);
    starsRef.getDownloadURL().then(function(url) {        
    }).catch(function(error) {
      console.log(error.message)
      switch (error.code) {
        case 'storage/object_not_found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  },
  upload_db: function(uid,pid,data){
    if(pid.length>1){
      FXR.db.ref('iklan/'+uid+'/'+pid).set({
        time: new Date().toISOString(),
        data: data
      });      
    }else{
      FXR.db.ref('iklan/'+uid).push().set({
        time: new Date().toISOString(),
        data: data
      });
    }
  },
  remove_db: function(pid){
    FXR.db.ref('iklan/'+FXR.user.uid+'/'+pid).remove();
  }
  
  
} //..


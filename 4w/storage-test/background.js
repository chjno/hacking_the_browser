console.log('begin living and learning 1');

function meta(){
  StorageArea.get('metaKey', function(test){
    console.log(test);
  });
}
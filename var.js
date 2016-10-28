


var FXR = FXR || {};

var IklanExp={
  x:{
    data:'...,|agraris|sumatera_utara|Contoh Judul|contoh isi|tikuz.jpg|Nama Perusahaan|000|Jl. xx|Deskripsi Perusahaan|Produk1, Produk2|http://xxx.xx',
    time:'77777777777777777'
  }
};

var Category=[
'agraris',
'makanan',
'kesehatan',
'hobi',
'fashion',
'elektronik',
'mobil',
'perabot-atk',
'industri',
'kreatif',
'konstruksi',
'properti',
'jasa',
'sewa'
];
    
var Province=[
'aceh:1',
'bali:1',
'banten:1',
'bengkulu:1',
'gorontalo:1',
'jakarta:1',
'jambi:1',
'jawa_barat:1',
'jawa_tengah:1',
'jawa_timur:1',
'kalimantan_barat:1',
'kalimantan_selatan:1',
'kalimantan_tengah:1',
'kalimantan_timur:1',
'kalimantan_utara:1',
'kepulauan_bangka:1',
'kepulauan_riau:1',
'lampung:1',
'maluku:1',
'maluku_utara:1',
'nusa_tenggara_barat:1',
'nusa_tenggara_timur:1',
'papua:1',
'papua_barat:1',
'riau:1',
'sulawesi_barat:1',
'selawesi_selatan:1',
'sulawesi_tengah:1',
'sulawesi_tenggara:1',
'sulawesi_utara:1',
'sumatera_barat:1',
'sumatera_selatan:1',
'sumatera_utara:1',
'yogyakarta:5'
];



// to sentence case
String.prototype.toProperCase = function(){
    return this.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};




// main
// view
// router
function getIn(){
  $('#head').css({display:'inline-block'})
  $('#nav > *').css({display:'none'})
  $('#nav-iklan').click()
  $('#nav > :not(.out)').css({display:'inline-block'})
  $('#main-cov > *').hide()
  $('#main-cov > :not(.out)').show()
  $('#l-login').text('Login')
  $('#l-password').val('')
  genAccount();
}
function getOut(){
  $('#head,#warn').css({display:'none'})
  $('#nav > *').css({display:'none'})
  $('#nav > .out').css({display:'inline-block'})
  $('#main-cov > *').hide()
  $('#main-cov > .out').show()
  $('#main-iklan').html('')
  setTimeout(function(){$('#nav-login').click()},1000);
}




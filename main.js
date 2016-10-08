'use strict';

String.prototype.toProperCase = function(){
    return this.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};


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

// select option
var locationOption='';
for(var i=0;i<Province.length;i++){
  locationOption+='<option>'+Province[i]
  .split(':')[0]
  .replace(/_/g,' ')
  .toProperCase()+'</option>';
}
$('#search-location').html(locationOption);


// map click

$('svg').on('click','path',function(){
  var t = $('svg').position().top;
  var l = $('svg').position().left;
  var d = Province[$(this).index()].split(':');
  $('.sv-green').removeClass('sv-green');
  $(this).addClass('sv-green');
  $('#map-tooltip')
    .css({
      'top': $(this).position().top-t-30,
      'left': $(this).position().left-l })
    .html(d[0].replace(/_/g,' ').toProperCase()+'<br/><b>('+d[1]+' Supplier)</b>');
});

$('#map-g > path:eq(7)').click();


var mapHeight=$('#map-svg').height();
var c='';
$('#map-g').children().each(function(i){
  c+='<d class="map-dot" style="top:'+
  ($(this).position().top)+'px;left:'+
  (($(this).position().left+($(this).width()/2))-8)+'px;">'+(i)+'</d>'
});




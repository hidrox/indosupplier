

/*
 * lib js
 */
// sentence case
String.prototype.toProperCase = function(){
    return this.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};
// filter unique array
Array.prototype.unique=function(){
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])a.splice(j--, 1);
        }
    } return a; };
// select option auto resize
(function($, window){
  $.fn.selectOptionAutoResize = function(settings){
    return this.each(function(){
      $(this).change(function(){
        var $this = $(this);
        var text = $this.find("option:selected").text();
        var $test = $("<span>").html(text);
        $test.appendTo('body');
        var width = $test.width();
        $test.remove();
        $this.width(width);
      });
    });
  };   $('select').selectOptionAutoResize(); })(jQuery,window);
// ajax setup
$(document)
  .ajaxStart(function(){$('#Loader').show()})
  .ajaxStop(function(){$('#Loader').hide()});





/*
 * Indosupplier
 */
 'use strict';
function Indosupplier(){

  // setup
  if(localStorage.cat===undefined)localStorage.cat='agraris';
  if(localStorage.loc===undefined)localStorage.loc='sumatera_utara';
  localStorage.max='99';
  localStorage.sec='AIzaSyAX6Ovl5QizH6f3C1RrWZ7kW8VqQ4PGcIs';
  localStorage.bid='1048694498853011397';
  localStorage.pid='';
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
    'sewa' ];
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
    'yogyakarta:5'];

  // auto 
  // generate
  // select-option
  function genSelectoption(){
    var c='';
    var l='';
    for(var i=0;i<Category.length;i++){
      c+='<option value="'+Category[i]+'">'+Category[i]
      .replace(/-/g,' & ')
      .toProperCase()+'</option>';
    }
    for(var i=0;i<Province.length;i++){
      l+='<option value="'+Province[i].split(':')[0]+'">'+Province[i]
      .split(':')[0]
      .replace(/_/g,' ')
      .toProperCase()+'</option>';
    }
    $('#option-category').html('<option disabled>Kategori</option>'+c).change();
    $('#option-location').html('<option disabled>Lokasi</option>'+l).change();
  } genSelectoption();
  // select > option click
  $('#option-category,#option-location').on('click','option',function(){
    var x=$(this).parent().attr('id').slice(7,10);
    var v=$(this).parent().val();
    if(getQuery(x)!==v){
      if(x==='cat'){ setQuery(v,getQuery('loc'))}
      else{          setQuery(getQuery('cat'),v)}
      getList('list');
    }
  });
  
  // Maps..
  // get map
  var ajax = new XMLHttpRequest();
  ajax.open("GET","//cdn.rawgit.com/hidrox/indosupplier/938d3312c2ee7f14f17a4ebf7ac9f0b6a2549c33/map.svg", true);
  ajax.send();
  ajax.onload = function(e){
    var div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    document.getElementById('map-wrapper').innerHTML='<div id="map-tooltip"></div>'+ajax.responseText;
    if($('#sec-0').is(':visible')){
      genMap();
    }
  }
  // map dots
  var maps;
  function genMap(){
    var c='';
    $('#map-g').children().each(function(i){
      c+='<d class="map-dot" style="top:'+
      ($(this)[0].getBoundingClientRect().top-220+pageYOffset)+'px;left:'+
      (($(this)[0].getBoundingClientRect().left+($(this).width()/2))-260)+'px;">'+(i)+' supplier</d>'
    });
    $('#map-wrapper').append(c);
    $('#map-g > path:eq('+getLocationId(getQuery('loc'))+')').click();
    $('.map-dot:eq('+13+')').show();

    setInterval(function(){
      var r=Math.floor((Math.random()*33));
      $('.path-hover').removeClass('path-hover');
      $('path:eq('+r+')').addClass('path-hover');
      $('.map-dot').hide();
      $('.map-dot:eq('+r+')').show();
    },5000);
    maps=1;
    window.history.pushState({},'','//www.indosupplier.co.id/');
  }
  // map click
  $('#map-wrapper').on('click','path',function(){
    var t = $('svg').position().top;
    var l = $('svg').position().left;
    var d = Province[$(this).index()].split(':');
    $('.sv-green').removeClass('sv-green');
    $(this).addClass('sv-green');
    $('#map-tooltip')
      .css({
        'top': $(this)[0].getBoundingClientRect().top-t-30+pageYOffset,
        'left': $(this)[0].getBoundingClientRect().left-l })
      .html(d[0].replace(/_/g,' ').toProperCase()+'<br/><b>('+d[1]+' Supplier)</b>');
    setQuery(getQuery('cat'),d[0]);
  });
  // get prov array-id by str
  function getLocationId(str){
    for(var i=0;i<Province.length;i++){
      if(Province[i].indexOf(str)>-1)return i
    }  return
  }

  // Home..
  // category click
  $('#cat').on('click','a',function(e){
    e.preventDefault();
    showArticle();
    setQuery($(this).attr('class'),getQuery('loc'));
    getList('list');
  });
  // home click
  $('.nav-home').on('click',function(){
    showHome();
  });
  function showHome(){
    $('#sec-1').hide();
    $('#sec-0').show();
    maps === undefined && genMap();
    $('#map-g > path:eq('+getLocationId(getQuery('loc'))+')').click();
    window.history.pushState({},'','//www.indosupplier.co.id/');
    $('html')
      .animate({scrollTop:20},0)
      .animate({scrollTop:0},1000);
  }
  function showArticle(){
    $('#sec-0').hide();
    $('#sec-1').show();
    $('html')
      .animate({scrollTop:20},0)
      .animate({scrollTop:0},1000);
  }

  // set/get
  // category-location
  function setQuery(cat,loc,sch){
    if(sch===undefined){
      window.history.pushState({},'','//www.indosupplier.co.id/p/'+cat+'.html?loc='+loc);
      $('#option-category').val(cat).change();
      $('#option-location').val(loc).change();
      localStorage.cat=cat;
      localStorage.loc=loc;
    }else{
      window.history.pushState({},'','//www.indosupplier.co.id/p/search?q='+sch);
    }
  }
  function getQuery(x){
    var u=document.location.toString();
    if(x==='cat'){
      if(u.indexOf('/p/')>-1 & u.indexOf('/p/search')<0){
        x=u.split('/p/')[1].split('.')[0];
      }else{x=localStorage.cat}
    }else if(x==='loc'){
      if(u.indexOf('loc=')>-1){
        x=u.split('loc=')[1];
      }else{x=localStorage.loc}
    }else if(x==='sch'){
      x=u.split('?q=')[1]
    }
    return x
  }

  // add iklan
  $('.nav-pasang').on('click',function(){
    $('#dialog-cov').fadeIn(300)
  });
  $('#dialog-cov').on('click',function(e){
    this===e.target && $('#dialog-cov').hide()
  });
    
  // search
  $('.cari-submit').on('click',function(){
    var v=$('.cari-input').val();
    if(v.length<3){}else{
      showArticle();
      setQuery(0,0,v);
      getList('sch');
    }});
  $('.nav-search-submit').on('click',function(){
    var v=$('.nav-search-input').val();
    if(v.length<3){}else{
      setQuery(0,0,v);
      getList('sch');
    }});
  // enter key on search
  $('.cari-input,.nav-search-input').keyup(function(e){
    e.keyCode===13 && $(this).siblings('input').click();
  });

  // side
  $('#side-category').on('click','d',function(){
    getContent($(this).attr('pid'));
    $('#side-category').find('.side-d-on').removeClass('side-d-on');
    $(this).addClass('side-d-on');
  });
  
  // get 
  // categori 
  // list
  function getList(type){
    window.scrollTo(0,0);
    var labels=encodeURIComponent('*'+getQuery('loc')+',*'+getQuery('cat'));
    // list or search
    type==='list'?
      type='?orderBy=updated&status=live&labels='+labels:
      type='/search?q='+getQuery('sch');
    $.get('//www.googleapis.com/blogger/v3/blogs/'+
      localStorage.bid+'/posts'+type+'&maxResults='+
      localStorage.max+'&fields=items(id%2Clabels%2Ctitle)&key='+
      localStorage.sec,
      function(r){
        //console.log(r);
        if(r.items===undefined){
          $('#side-category').html('Tidak ada data.');
          return false
        }
        if(r.items.length>-1){
          var l=[];
          r.items.forEach(function(el){
            l=l.concat(el.labels)
          });
          l=l.unique().filter(function(e){
            return e.charAt(0)!=='*'
          });
          var h1='';
          var hx='';
          var cx=0;
          var first;
          // each labels
          l.forEach(function(el1){
              var h2='';
              var c2=0;
              // each items
              r.items.forEach(function(el2){
                if(el2.labels.indexOf(el1)>-1){
                  h2+="<d class='side-category-item' pid='"+el2.id+"' title='"+el2.title+"'>"+el2.title+"</d><br>";
                  c2++;
                 // labelless
                }else{
                  if( !first & el2.labels.length===2 ){
                    hx+="<d class='side-category-item' pid='"+el2.id+"' title='"+el2.title+"'>"+el2.title+"</d><br>";
                    cx++;
                  }
                }
              });
              first=99;
              h1+="<div class='side-category-cov'>"+
                  "<t class='side-category-title' count='"+c2+"'>"+el1+"</t><br>"+h2+"</div>";
          });
              hx="<div class='side-category-cov'>"+
                  "<t class='side-category-title' count='"+cx+"'>Lainnya</t><br>"+hx+"</div>";
          $('#side-category').html(h1+hx);
        }
      }
    );
  }

  // get 
  // the 
  // article
  function getContent(pid){
    window.scrollTo(0,0);
    $.get('//www.googleapis.com/blogger/v3/blogs/'+
      localStorage.bid+'/posts/'+
      pid+'?maxComments=0&fields=author%2FdisplayName%2Ccontent%2Cid%2Clabels%2Ctitle%2Cupdated%2Curl&key='+
      localStorage.sec,
      function(r){
        if(r.title===undefined){
          $('cent').html('Tidak ada data.');
          return false
        }
        var h='\
  <div id="article">\
  <div id="article-stats">\
  <e>Update: <b>'+r.updated.substr(0,19).replace('T',' ')+'</b></e>\
  <e>Views: 168399</e>\
  <e>Author: '+r.author.displayName+'</e>\
  <e>Label: '+r.labels.join(', ').replace(/\*/g,'')+'</e>\
  </div>\
  <h1 id="article-title">'+r.title+'</h1>\
  <div id="article-content">'+r.content+'</div>\
  </div>\
  ';
        $('#cent').html(h);
      });
  }


  // 2nd router
  if(document.location.toString().indexOf('/p/search')>-1){
    setQuery(0,0,getQuery('sch'));
    getList('search');
  }else if(document.location.toString().indexOf('/p/')>-1){
    getList('list');
  }

} 
// end
// of
// Indosupplier()




// 1st router
if(document.location.toString().indexOf('/p/id-')>-1){
  document.getElementById('text').innerHTML=
  document.getElementsByTagName('article')[0].innerHTML;
}else{
  Indosupplier()
}


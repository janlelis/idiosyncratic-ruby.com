$(function(){
  if(!$('#percent-syntax--q').length && !$('#the-ruby-one-liner-toolbox')){
    $('code').attr("data-language", "ruby");
  }
});

$(function(){
  $('h2').each(function(_, element){
    if(!$(element).find('a').length){
      $(element).replaceWith(
        $('<h2 id="' + element.id + '"><a href="#' + element.id + '">' + $(element).html() + '</a></h2>')
      )
    }
  });

  $('h3').each(function(_, element){
    if(!$(element).find('a').length){
      $(element).replaceWith(
        $('<h3 id="' + element.id + '"><a href="#' + element.id + '">' + $(element).html() + '</a></h3>')
      )
    }
  });
});
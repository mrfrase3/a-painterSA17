(()=>{
  const template = Handlebars.compile($('#painting-template').html());
  const base_url = window.location.origin + (window.location.pathname.replace(/[^\\\/]*$/, '') || '/');
  const apainter_url = 'https://aframe.io/a-painter/';
  const $paintings =  $('.paintings');
  let $currow = null;
  let c = 0;
  const load_painting = (name) => {
    $.get('./paintings/'+name+'/about.json').done(about=>{
      if(c%3 == 0){
        $currow = $('<div class="row"></div>');
        $paintings.append(currow);
      }
      c++;
      let context = {
        name: about.name,
        authors: about.authors,
        created: moment(about.created).format('llll'),
        imageurl: `${base_url}paintings/${name}/Screenshot.png`,
        url: `${apainter_url}?url=${about.url}`,
        desc: about.desc || ""
      };
      $currow.append(template(context));
    });
  };

  $.get('./paintings/files.json').done(files=>{
    files.forEach(file=>{
      load_painting(file);
    });
  });

  $(".button-collapse").sideNav();
})();

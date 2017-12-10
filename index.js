(()=>{
  const template = Handlebars.compile($('#painting-template').html());
  const base_url = window.location.origin + (window.location.pathname.replace(/[^\\\/]*$/, '') || '/');
  const apainter_url = 'https://aframe.io/a-painter/';
  const load_painting = (name) => {
    $.get('./paintings/'+name+'/about.json').done(about=>{
      let context = {
        name: about.name,
        authors: about.authors,
        created: moment(about.created).format('llll'),
        imageurl: `${base_url}paintings/${name}/Screenshot.png`,
        url: `${apainter_url}?urljson=${encodeURIComponent(`${base_url}paintings/${name}/painting.json`)}`
      };
      $('.row').append(template(context));
    });
  };

  $.get('./paintings/files.json').done(files=>{
    files.forEach(file=>{
      load_painting(file);
    });
  });
})();
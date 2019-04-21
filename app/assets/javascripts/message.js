$(function(){

  function buildHTML(message){
    var image = '';
    if (message.image) {
      image = `<img src="${message.image}" class="lower-message__image">`;
    }

    var html = `<div class=message>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                     ${image}
                    </div>
                  </div> `

    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');}

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })

   .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      scroll();
   })
    .fail(function(){
      alert('error');
   })
  })
});

/*    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })*/

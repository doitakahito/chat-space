$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var imageHTML = (message.image) ?  `<class="lower-message__image"img src="${message.image}" >` :""
    var html = `<div class = "message"data-id=${message.id}>
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
                    </div>                      
                     ${imageHTML}
                  </div> `

    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');}

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
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
      $('.form__submit').prop('disabled', false);
      scroll();
   })
    .fail(function(){
      alert('error');
   });
  });

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message:last').data('id');
    };

    $.ajax({
      type: 'GET',
      url: location.href,
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      if (messages.length !== 0) {
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        scroll();
      })
    }
    })
    .fail(function() {
      console.log('error');
      alert('自動更新に失敗しました');
    })
  }
  setInterval(reloadMessages, 3000);
});



$(document).on('turbolinks:load', function() {

var user_list = $("#user-search-result");
var member_list = $(".chat-group-users");

function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
</div>`

    user_list.append(html);
}

 function appendErrMsgToHTML(user) {
    var html = ``
    user_list.append(html);
  }

 function buildHTML(user_id, name) {
    var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
        <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
        <p class='chat-group-user__name'>${ name }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${user_id}"'>削除</a>
      </div>`

    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('失敗しました');
    })


  $("#user-search-result").on('click','.user-search-add', function() {
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $('#user-search-field').val('');
    $(this).parent().remove();
    buildHTML(id, name);
  })

  $(".chat-group-users").on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
 });
});

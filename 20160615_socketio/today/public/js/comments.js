$(document).ready(function() {
  // comments:create
  var form = $("section#comments-ajax-create-section form");
  var postId = $(form).data("post-id");
  var url = "/api/posts/" + postId + "/comments/";

  var commentsListElement = $("#comments-list-section ul");
  var commentsCountElement = $("#comments-count");

  // comments:list
  // 댓글을 로딩한다.
  $.ajax({
    url: url,
    type: "GET",
    success: function(result) {
      // comments count
      var commentsCount = result.length;
      $(commentsCountElement).html(commentsCount);

      // comments list
      result.forEach(function(comment) {
        $(commentsListElement).append($("<li>").text(comment.content));
      });
    }
  });

  // comments:create
  form.submit(function() {
    var inputElement = $(form).find("input[name='content']");
    var content = $(inputElement).val();
    var data = {
      content: content
    };

    // ajax Request
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(result) {
        // 데이터 list 에다가 추가하기
        $(commentsListElement).append($("<li>").text(content));

        // 댓글 카운트 올리기
        var commentsCount = $(commentsCountElement).html();
        $(commentsCountElement).html(Number(commentsCount) + 1);

        // 기존의 input 을 깔끔하게 비워준다.
        $(inputElement).val("");
      },
      error: function(result) {
        alert("error");
      }
    });

    return false;  // submit 버튼 이후에 기존이 form 이 동작하지 않도록 한다.
  });
});

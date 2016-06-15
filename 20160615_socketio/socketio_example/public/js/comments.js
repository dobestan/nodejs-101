$(document).ready(function() {
  var postId = $("section#comments-section").data("post-id");
  var commentsListSection = $("section#comments-list-section");
  var url = "/api/posts/" + postId + "/comments/";

  // comments:list
  $.ajax({
    url: url,
    type: "GET",
    success: function(result) {
      result.forEach(function(comment) {
        $(commentsListSection).find("ul").append($("<li>").text(comment.content));
      });
    }
  });

  // comments:create
  var form = $("section#comments-ajax-create-section form");

  form.submit(function() {
    var input = $(form).find("input[name='content']");
    var content = input.val();

    var data = {
      content: content
    };

    $.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(result) {
        input.val("");
        $(commentsListSection).find("ul").append($("<li>").text(content));
        var commentsCountElement = $(commentsListSection).find("span#comments-count");
        var commentsCount = $(commentsCountElement).html();
        commentsCountElement.html(Number(commentsCount) + 1);
      },
      error: function(result) {
        alert(result);
      }
    });

    return false;
  });
});

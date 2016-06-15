$(document).ready(function() {
  var postId = $("section#comments-section").data("post-id");

  // comments:list

  // comments:create
  var form = $("section#comments-ajax-create-section form");
  var commentsListSection = $("section#comments-list-section");

  form.submit(function() {
    var input = $(form).find("input[name='content']");
    var content = input.val();

    var data = {
      content: content
    };
    var url = "/api/posts/" + postId + "/comments/";

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

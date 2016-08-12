



$(document).ready(function() {
  var apiUrl = "/api/posts/";

  $.ajax({
    url: apiUrl,
    method: "GET",
    success: function(posts) {
      posts.forEach(function(post) {
        $("ul#posts").append( $("<li>").text(post.title) );
      });
    }
  });

  $("form#posts-form").submit(function() {
    var title = $("form#posts-form input[name='title']").val();
    var content = $("form#posts-form input[name='content']").val();

    var post = {
      title: title,
      content: content
    }

    $.ajax({
      url: "/api/posts/",
      data: post,
      method: "POST",
      success: function(data) {
        $("ul#posts").append( $("<li>").text(post.title) );
      }
    });

    $("form#posts-form input[name='title']").val("");
    $("form#posts-form input[name='content']").val("");

    return false;
  });

});

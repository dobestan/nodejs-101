(function() {
  $(document).ready(function() {
    var postsElement = $("#posts");
    var url = "/api/posts/";

    // 1. 주체: Client ( 쪽지가 왔습니다!, Push! )
    //    - Client 1s => Server> "push"?, "note"?
    // 2. Connection: 1회성으로 연결(HTTP Request)
    // ==============================================
    // Web Socket

    $.ajax({
      url: url,
      type: "GET",
      success: function(posts) {
        posts.forEach(function(post) {
          $(postsElement).append("<li>" + post.title + "</li>");
        });
      }
    });

    var formElement = $("form");
    var titleElement = $(formElement).find("input[name='title']");
    var contentElement = $(formElement).find("input[name='content']");

    formElement.submit(function() {
      var title = $(titleElement).val(); // jQuery Function => getter, setter
      var content = $(contentElement).val();
      var data = {
        title: title,
        content: content
      };

      $.ajax({
        url: url,
        data: data,
        type: "POST",
        success: function(result) {
          alert(result);
          $(postsElement).append("<li>" + title + "</li>");
        }
      });

      $(titleElement).val("");
      $(contentElement).val("");

      return false;
    });
  });
})();



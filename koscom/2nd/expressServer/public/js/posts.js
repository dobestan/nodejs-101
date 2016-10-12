(function() {
  $(document).ready(function() {
    var postsElement = $("#posts");

    var formElement = $("form");
    var titleElement = $(formElement).find("input[name='title']");
    var contentElement = $(formElement).find("input[name='content']");

    var url = "/api/posts/";

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



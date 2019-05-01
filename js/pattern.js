(function($) {

  var methods = {
      init : function(options) {

        // Listeners
        function togglePatterns(e) {
          var menu = $(e.target).closest(".patterns__current").parent().find(".patterns__menu");
          console.log(menu);
          if (menu.attr("class").indexOf("hidden") !== -1) {
            menu.removeClass("hidden");
          } else {
            menu.addClass("hidden");
          }
        }

        function selectPattern(e) {
          var selected = $(e.target).closest("li").find("div").clone();
          var patternSelect = $(e.target).closest(".patterns");
          var current = patternSelect.find(".patterns__current");
          var menu = patternSelect.find(".patterns__menu");

          menu.addClass("hidden");
          current.html(selected);
          patternSelect.attr("value", selected.attr("value"));
        }

        // Main routine
        $(this).each(function(i, obj) {
          // Set for empty current div
          if ($(obj).has(".patterns__current").length == 0) {
            $(obj).append("<div class='patterns__current'></div>");
            var attr = $(obj).attr("value");
            if (attr != undefined && attr.length > 0) {
              $(obj).find(".patterns__current").html(
                $(obj).find("ul").find("[value='"+attr+"']").clone()
              );
            }
            else {
              $(obj).find(".patterns__current").html(
                $(obj).find(".patterns__menu li").first().html()
              );
            }
          }

          // Add listeners
          $(obj).find(".patterns__current").click(togglePatterns);
          $(obj).find(".patterns__menu li").click(selectPattern);
        });

      }
  };

  $.fn.patternSelect = function(methodOrOptions) {
      if ( methods[methodOrOptions] ) {
          return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
          // Default to "init"
          return methods.init.apply( this, arguments );
      } else {
          $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.patternSelect' );
      }
  };

  $.fn.patternSet = function(attr) {
    if ($(this).find("ul").find("[value='"+attr+"']").length != 0) {
      $(this).find(".patterns__current").html(
        $(this).find("ul").find("[value='"+attr+"']").clone()
      );
      $(this).attr("value", attr);
    }
  };

})(jQuery);

(function($) {

    Drupal.behaviors.zebis_search = {
        attach: function(context, settings) {
            autocomplete_path = '/' + Drupal.settings.zebis_search.settings_autocomplete.path;

            $.widget("custom.metcomplete", $.ui.autocomplete, {
                _create: function() {
                    this._super();
                    this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
                },
                _renderMenu: function(ul, items) {
                    var that = this,
                            currentCategory = "";
                    $.each(items, function(index, item) {
                        var li;
                        if (item.category != currentCategory && item.category != false) {
                            ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                            currentCategory = item.category;
                        }
                        li = that._renderItemData(ul, item);
                        if (item.category) {
                            li.attr("aria-label", item.category + " : " + item.label);
                        }

                        if (item.url == 'all_res') {
                           li.attr('class', 'ui-autocomplete-category'); 
                        }
                    });
                    //ul.append('<li class="all_results"><a href="#" class="do_search">' + Drupal.t('Weitere Resultate ansehen...') + '</a></li>');
                }
            });


            $(".zebis_search_autocomplete").metcomplete({
                source: autocomplete_path,
                minLength: Drupal.settings.zebis_search.settings_autocomplete.minlength,
                select: function(event, ui) {

                    var url = ui.item.url;
                    if (url != '#' && url != 'all_res') {
                        location.href = url;
                    }
                    else {
                        if (url == 'all_res') {
                            $('#search-block-form').submit();
                        }
                    }

                },
                html: true
            });



        }
    };

})(jQuery);
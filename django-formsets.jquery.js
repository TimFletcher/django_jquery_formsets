(function($){
    $.fn.formset = function(options){
        var options = $.extend({}, $.fn.formset.defaults, options)
        var container = this;
        var addButtonId = options.prefix + '-' + options.addCssClass;
        var addLink = '<a id="' + addButtonId + '" class="' + options.addCssClass + '" href="javascript:void(0);">' + options.addText + '</a>';
        var removeButtonId = options.prefix + '-' + options.removeCssClass;
        var removeLink = '<a id="' + removeButtonId + '" class="' + options.removeCssClass + '" href="javascript:void(0);">' + options.removeText + '</a>';
        container.append(addLink)
        container.find('> div:not(:first)').hide();
        addButton = $('#' + addButtonId);
        addForm = function(){

            // Every time the link is clicked, show another form and add a remove link
            newForm = $(this).siblings('div:hidden').first();
            newForm.show();
            newForm.after(removeLink);

            // Remove add link if we're at the maximum number of forms
            formCount = container.find(' > div:visible').length;
            maxFormCount = parseInt($('#id_' + options.prefix + '-TOTAL_FORMS').val());
            if (formCount == maxFormCount) {
                $(this).remove();
            }

            // Remove a form when we click on its remove link 
            removeButtons = $('.' + options.removeCssClass);
            removeButtons.click(removeForm);
        };
        removeForm = function(){

            // Clear forms before hiding them so they don't get validated
            $(this).prev()
                .find(':input')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
            $(this).prev().hide();

            // If we are removing the last of the buttons, we'll need to put the add button back in
            formCount = container.find(' > div:visible').length;
            maxFormCount = parseInt($('#id_' + options.prefix + '-TOTAL_FORMS').val());
            if (formCount != maxFormCount) {
                if ($('#' + addButtonId).length == 0) {
                    container.append(addLink);
                    addButton = $('#' + addButtonId);
                    addButton.click(addForm);
                }
            }
            $(this).remove();
        };

        addButton.click(addForm);

        // If some of the formsets have data, we need to show them.
        inputs = container.find('[id^="id_' + options.prefix + '"]')
        inputs.each(function(){
            if ($(this).val()) {
                console.log($(this).parents('.form'))
                $(this).parents('.form').show().each(function(){
                    $(this).after(removeLink);
                    removeButtons = $('.' + options.removeCssClass);
                    removeButtons.click(removeForm);
                });
            }
        });
    };
})(jQuery)
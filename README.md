Django's admin allows you to dynamically add and remove formset forms. This jQuery plugin does the same for the front end.

## Markup

Each form is rendered using [django-uni-form](https://github.com/pydanny/django-uni-form). I've wrapped each form in an additional div.form. This makes it a lot easier to target each entire form.

    <div class="formset-group" id="phone_formset">
        <h2>Phones</h2>
        {% for phone_form in phone_formset.forms %}
            <div class="form">
                {{ phone_form|as_uni_form }}
            </div>
        {% endfor %}
    </div>

## Initialisation

Simply copy the plugin to your scripts directory and link it up into your page. Then initialise the plugin as detailed below. All parameters are required at the moment.

    <script type="text/javascript" charset="utf-8" src="{{ MEDIA_URL }}scripts/formsets.jquery.js"></script>
    <script type="text/javascript" charset="utf-8">
        $(document).ready(function(){
            $('#phone_formset').formset({
                'prefix': 'phone_set',
                'addCssClass': 'add-link',
                'addText': 'Add',
                'removeCssClass': 'remove-link',
                'removeText': 'Remove'
            });
        });
    </script>

## Status

I've not used this in production yet but it seems fairly robust in my testing. Please log bugs/enhancements as you find them.
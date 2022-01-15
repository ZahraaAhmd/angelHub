function select2tags() {
    var tags = [],
        placeholder = '';

    $(".select2").each(function(i) {
        $t = $(this).attr("data-select", i);

        $t.select2({
                id: -1,
                placeholder: placeholder
            })
            .on("select2:select", function(e) {
                var selected = {
                    value: e.params.data.text,
                    select: $(this).attr("data-select")
                };
                tags.push(selected);

                $(this).next().find('.select2-selection__custom').html(selected.value + ' (' + $(this).val().length + ')');

                displayTags();
            })
            .on("select2:unselect", function(e) {
                var selected = {
                    value: e.params.data.text,
                    select: $t.attr("data-select")
                };

                foundObj = findObjectByKey(tags, "value", selected.value);
                indexToDelete = tags.indexOf(foundObj);
                tags.splice(indexToDelete, 1);

                val = $(this).val()[0] == undefined ? placeholder : $(this).val()[0] + ' (' + $(this).val().length + ')'
                $(this).next().find('.select2-selection__custom').html(val);

                displayTags();

                setTimeout(function() {
                    $('.select2-dropdown').parent().remove();
                }, 1);
            });

        // Adding Fake Selection Placeholder
        $('<div class="select2-selection__custom">' + placeholder + '</div>').appendTo($t.next().find('.select2-selection'));
    });


    // DELETE TAGS
    $(".tags-area").on("click", ".tag", function() {
        var selected = {
            value: $(this).find(".value").text(),
            select: $(this).attr("data-select")
        };

        foundObj = findObjectByKey(tags, "value", selected.value);
        indexToDelete = tags.indexOf(foundObj);

        tags.splice(indexToDelete, 1);

        values = $('select[data-select="' + selected.select + '"]').val();
        values.splice(values.indexOf(selected.value), 1);

        $('select[data-select="' + selected.select + '"]').val(values).trigger('change');

        val = values[0] == undefined ? placeholder : values[0] + ' (' + values.length + ')'
        $('select[data-select="' + selected.select + '"]').next().find('.select2-selection__custom').html(val);

        $(this).remove();
        return false;
    });


    // DISPLAY TAGS
    function displayTags() {
        $(".tags-area").html("");

        for (i = 0; i < tags.length; i++) {
            $('<a href="#" class="tag" data-select="' + tags[i].select + '"><span class="value">' + tags[i].value + "</span></a>").appendTo($(".tags-area"));
        }
    }
    /*  $(".clear-filter").on("click", function() {
          $(".tag").remove();
          $('.select2').val(null).trigger("change");
          $(".select2").select2("val", "");
          $('.select2-selection__custom').empty();
          $('.select2').html('').select2({ data: [{ id: '', text: '' }] });
          $(this).style("background", "red");
      });*/
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

select2tags();
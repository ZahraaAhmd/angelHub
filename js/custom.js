$(".js-select2").select2({
    closeOnSelect: false,
    allowHtml: true,
    allowClear: false,
    tags: true
});

function select2tags() {
    var tags = [],
        placeholder = '';

    $(".select2").each(function(i) {
        $t = $(this).attr("data-select", i);

        $t.select2({
                id: -1,
                placeholder: function() {
                        $(this).data('placeholder');
                    }
                    //placeholder: data - placeholder
            })
            .on("select2:select", function(e) {
                var selected = {
                    value: e.params.data.text,
                    select: $(this).attr("data-select")
                };
                tags.push(selected);

                // $(this).next().find('.select2-selection__custom').html(selected.value + ' (' + $(this).val().length + ')');

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

                /* val = $(this).val()[0] == undefined ? placeholder : $(this).val()[0] + ' (' + $(this).val().length + ')'
                $(this).next().find('.select2-selection__custom').html(val);
*/
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

        /* val = values[0] == undefined ? placeholder : values[0] + ' (' + values.length + ')'
        $('select[data-select="' + selected.select + '"]').next().find('.select2-selection__custom').html(val);
*/
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
$(".investors-search .col-6:first-child .select2-selection__custom").html("Industry Focused");
$(".investors-search .col-6:last-child .select2-selection__custom").html("Investment Ticket");
/*$(".clear-filter").click(function() {
    $(".tag").remove();
    $('.select2').val(null).trigger("change");
    $(".select2").select2("val", "");
    $('.select2-selection__custom').empty();
    $('.select2').html('').select2({ data: [{ id: '', text: '' }] });

});
const progress = (value) => {
    document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
}*/

let step = document.getElementsByClassName('step');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let submitBtn = document.getElementById('submit-btn');
let form = document.getElementById('form-wrapper');
let preloader = document.getElementById('preloader-wrapper');
let bodyElement = document.querySelector('body');
let succcessDiv = document.getElementById('success');
let Nice = document.getElementById('ascrail2000');

form.onsubmit = () => {
    return false
}

let current_step = 0;
let stepCount = 3
step[current_step].classList.add('d-block');
if (current_step == 0) {
    prevBtn.classList.add('d-none');
    submitBtn.classList.add('d-none');
    nextBtn.classList.add('d-inline-block');
}


nextBtn.addEventListener('click', () => {
    current_step++;
    let previous_step = current_step - 1;
    if ((current_step > 0) && (current_step <= stepCount)) {
        prevBtn.classList.remove('d-none');
        prevBtn.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block');
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step == stepCount) {
            submitBtn.classList.remove('d-none');
            submitBtn.classList.add('d-inline-block');
            nextBtn.classList.remove('d-inline-block');
            nextBtn.classList.add('d-none');
        }
    } else {
        if (current_step > stepCount) {
            form.onsubmit = () => {
                return true
            }
        }
    }
    // progress((100 / stepCount) * current_step);
});


prevBtn.addEventListener('click', () => {
    if (current_step > 0) {
        current_step--;
        let previous_step = current_step + 1;
        prevBtn.classList.add('d-none');
        prevBtn.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block')
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step < stepCount) {
            submitBtn.classList.remove('d-inline-block');
            submitBtn.classList.add('d-none');
            nextBtn.classList.remove('d-none');
            nextBtn.classList.add('d-inline-block');
            prevBtn.classList.remove('d-none');
            prevBtn.classList.add('d-inline-block');
        }
    }

    if (current_step == 0) {
        prevBtn.classList.remove('d-inline-block');
        prevBtn.classList.add('d-none');
    }
    progress((100 / stepCount) * current_step);
});


submitBtn.addEventListener('click', () => {
    preloader.classList.add('d-block');

    const timer = ms => new Promise(res => setTimeout(res, ms));
    form.onsubmit = () => {
        return true
    }
    timer(3000)
        .then(() => {
            bodyElement.classList.add('loaded');
        }).then(() => {
            step[stepCount].classList.remove('d-block');
            step[stepCount].classList.add('d-none');
            prevBtn.classList.remove('d-inline-block');
            prevBtn.classList.add('d-none');
            submitBtn.classList.remove('d-inline-block');
            submitBtn.classList.add('d-none');
            succcessDiv.classList.remove('d-none');
            succcessDiv.classList.add('d-block');
        });

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.upload-img').css('background-image', 'url(' + e.target.result + ')');
            $('.upload-img').hide();
            $('.upload-img').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$(".upload-img input").change(function() {
    readURL(this);
});
$(".file-attach input").change(function() {
    var name = $(this).val().split('\\').pop();
    name = name.split('.')[0];
    $('.file-attach span').html(name);
});
$(document).ready(function() {

    $('.js-example-basic-multiple').select2();
    $(".company-form").click(function() {
        $(".company-list").removeClass("d-none");
        $(".investor-form #q-box__buttons .btn-primary").removeClass("disabled");
        $(".investor-form #q-box__buttons .btn-primary").attr("aria-disabled", "false");
        $(".form-field .no-company").hide();
        $(".comany-step .progress-bar").css("width", "95%");
    });
});
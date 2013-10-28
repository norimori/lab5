//Sets up page upon loading and button click events
$(function() {
    $('.sort-ui .btn').popover({
        content: function() {
            return 'Click to Resort by ' + $(this).html();
        },
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });

    sortObjArray(Employees.entries, 'last'); //Initially sorted by last name
    render();

    $('.sort-ui .btn').click(function() {
        var $sortBtn = $(this);
        var $sortType = $sortBtn.attr('data-sortby');
        $('button').siblings('.active').removeClass('active');
        sortObjArray(Employees.entries, $sortType);
        render();
        $sortBtn.addClass('active');
    }); 
}); //document set up

//Populates employee template information
//*@param entries - array of address book entry objects*/
function render(entries) {
    var $template = $('.template');
    var $addressBook = $('.address-book');
    
    $addressBook.hide(); //hide before fadeIn
    $addressBook.empty(); //reset contents
    
    $.each(Employees.entries, function() {
        $instance = $template.clone(); //creates template to fill
        $instance.find('.first').html(this.first); //this = element in array currently iterating over
        $instance.find('.last').html(this.last);
        $instance.find('.lead').html(this.title);
        $instance.find('.dept').html(this.dept);
        $instance.find('.pic').attr({
            src: this.pic,
            alt: 'picture of ' + this.first + ' ' + this.last
        });

        $instance.removeClass('template'); //make entry visible
        $addressBook.append($instance);
    })
    $addressBook.fadeIn();
}

/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()


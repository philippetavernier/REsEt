//////////////////////////////
//PRG IN DEBUG MOD§E
///////////////////////////

$(function () {
///////////////////////////
//SOcket connction
//////////////////////////
  var socket = io.connect('http://192.168.1.17:8099');

////////////////////////////////
//Notification
////////////////////////////////
/*$('.top-right').notify({
message: {text: 'hahahah'}
}).show();
*/
////////////////////////////////
//timeStamp
////////////////////////////////
var date;
var timeStamp;
var timeStampBefore;
var inBetween;

//        timeStamp = new Date().getTime();
function clock(){
    timeStamp = new Date().valueOf();
    console.log("time : " + timeStamp);
    console.log("time before : " + timeStampBefore);
    console.log("in between : " + (timeStamp-timeStampBefore));
    inBetween=timeStamp-timeStampBefore;


    timeStampBefore=timeStamp;
    //return inBetween; 
    if (inBetween<=25) return 1; //too short so don't send
    else return 0;

    }
/////////////////////////////////////////////////
     //####### Slider

    // Horizontal slider
    /*$('#h-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: 17
    });*/
/////////////////////////////////////////////////////
// SLIDER 1
/////////////////////////////////////////////////////
    $('#h-slider1').slider({
    range: true,
    min: 0,
    max: 100,
    values: 17,
    slide: function (event, ui) {
        var clockReturn;
        $("#value_h-slider1").val(ui.value);
        console.log(ui.value);
        clockReturn=clock();
        //console.log("clockReturn f = "+ clockReturn);
        if (clockReturn==1) {
            console.log("SLIDER TOO FASSSSSST");
        }

        else if (clockReturn==0){
            console.log("Slider not to fast so socketemit");
            socket.emit('browser slider1' ,ui.value);  
        } 
        //date=new Date();
        //timeStamp = Number(new Date().getSeconds());
        //timeStamp = new Date().getSeconds();
        //timeStamp = new Date().getTime();
    },
    stop: function (event, ui) {
        $("#value_h-slider1").val(ui.value);
        console.log(ui.value);
        console.log("Slider STOPED so socketemit");
        socket.emit('browser slider1' ,ui.value);
        }
    });
    $("#value_h-slider1").val($("#h-slider1").slider("value"));
/////////////////////////////////////////////////////
// SLIDER 2
/////////////////////////////////////////////////////
$('#h-slider2').slider({
    range: true,
    min: 0,
    max: 100,
    values: 17,
    slide: function (event, ui) {
        var clockReturn;
        $("#value_h-slider2").val(ui.value);
        console.log(ui.value);
        clockReturn=clock();
        if (clockReturn==1) {
            console.log("SLIDER TOO FASSSSSST");
        }

        else if (clockReturn==0){
            console.log("Slider not to fast so socketemit");
            socket.emit('browser slider2' ,ui.value);  
        }
    },
    stop: function (event, ui) {
        $("#value_h-slider2").val(ui.value);
        console.log(ui.value);
        console.log("Slider STOPED so socketemit");
        socket.emit('browser slider2' ,ui.value);
        }
    });
    $("#value_h-slider1").val($("#h-slider2").slider("value"));
/////////////////////////////////////
    // Vertical slider
    $("#v-slider").slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 60,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
            console.log(ui.value)
        }
    });
    $("#amount").val($("#v-slider").slider("value"));


    //####### Buttons
    $('button,.button,#sampleButton').button();

    // Buttonset
    $('#radioset').buttonset();
    $('#radioset1').buttonset();
    $("#format").buttonset();

    //####### Toolbar
    $("#play, #shuffle").button();
    $("#repeat").buttonset();

    //####### Accordion
    $("#menu-collapse").accordion({
        header: "h3"
    });

    // Dialog Link
    $('#dialog_link').click(function () {
        $('#dialog_simple').dialog('open');
        return false;
    });

    // Modal Link
    $('#modal_link').click(function () {
        $('#dialog-message').dialog('open');
        return false;
    });
    //hover states on the static widgets
    $('#dialog_link, #modal_link, ul#icons li').hover(
        function () {
            $(this).addClass('ui-state-hover');
        }, function () {
            $(this).removeClass('ui-state-hover');
        }
    );

    // Dialog Simple
    $('#dialog_simple').dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });

    //####### Dialogs
    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });

    // Remove focus from buttons
    $('.ui-dialog :button').blur();

    //####### Tabs
    $('#tabs2, #tabs, #tabs3').tabs();

    // Dynamic tabs
    var tabTitle = $( "#tab_title" ),
        tabContent = $( "#tab_content" ),
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
        tabCounter = 2;

    var tabs = $( "#tabs2" ).tabs();

    // modal dialog init: custom buttons and a "close" callback reseting the form inside
    var dialog = $( "#dialog2" ).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Add: function() {
                addTab();
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
        }
    });

    // addTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).submit(function( event ) {
        addTab();
        dialog.dialog( "close" );
        event.preventDefault();
    });

    // actual addTab function: adds new tab using the input from the form above
    function addTab() {
        var label = tabTitle.val() || "Tab " + tabCounter,
            id = "tabs-" + tabCounter,
            li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
            tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        tabCounter++;
    }

    // addTab button: just opens the dialog
    $( "#add_tab" )
        .button()
        .click(function() {
            dialog.dialog( "open" );
        });

    // close icon: removing the tab on click
    $( "#tabs2" ).on( "click",'span.ui-icon-close', function() {

        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });

    //Combination examples (tabs) and open dialog
    $('#sampleButton').on('click', function(event){
        event.preventDefault();
        $('#dialog_simple').dialog({
            autoOpen: true,
            modal: true,
            width: 600,
            buttons: {
                "Save": function () {
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    //####### Datepicker
    $('#datepicker').datepicker({
        inline: true
    });



    // Autocomplete
    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

    $("#tags").autocomplete({
        source: availableTags
    });

    //####### Menu
    $("#menu").menu();

    //####### Spinner

    var spinner = $( "#spinner" ).spinner();

    $( "#disable" ).click(function() {
        if ( spinner.spinner( "option", "disabled" ) ) {
            spinner.spinner( "enable" );
        } else {
            spinner.spinner( "disable" );
        }
    });
    $( "#destroy" ).click(function() {
        if ( spinner.data( "ui-spinner" ) ) {
            spinner.spinner( "destroy" );
        } else {
            spinner.spinner();
        }
    });
    $( "#getvalue" ).click(function() {
        alert( spinner.spinner( "value" ) );
    });
    $( "#setvalue" ).click(function() {
        spinner.spinner( "value", 5 );
    });

    //####### Tooltip

    $( "#tooltip" ).tooltip();

    // File input (using http://filamentgroup.com/lab/jquery_custom_file_input_book_designing_with_progressive_enhancement/)
    /*$('#file').customFileInput({
        button_position : 'right'
    });

    //####### Wijmo

    $("#menu1").wijmenu({ trigger: ".wijmo-wijmenu-item", triggerEvent: "click" });
*/
    // Select a Date Range with datepicker
    $( "#rangeBa" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#rangeBb" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#rangeBb" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#rangeBa" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
});
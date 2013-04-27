$(function () {

var socket = io.connect('http://192.168.1.19:8080');

    //####### Buttons
    $('button,.button,#sampleButton').button();

    // Buttonset
    $('#radioset').buttonset();
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


    //####### Slider

    // Horizontal slider
    $('#h-slider').slider({
        range: true,
        min: 0,
        max: 100,
        values: 17
    });
    $('#h-slider1').slider({
    range: true,
    min: 0,
    max: 100,
    values: 17,
    slide: function (event, ui) {
        $("#value_h-slider1").val(ui.value);
        console.log(ui.value)
        socket.emit('browser slider1' ,ui.value);
        }
    });
    $("#value_h-slider1").val($("#h-slider1").slider("value"));

    $('#h-slider2').slider({
    range: true,
    min: 0,
    max: 100,
    values: 17,
    slide: function (event, ui) {
        $("#value_h-slider2").val(ui.value);
        console.log(ui.value)
        socket.emit('browser slider2' ,ui.value);
        }
    });
    $("#value_h-slider2").val($("#h-slider2").slider("value"));

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



});
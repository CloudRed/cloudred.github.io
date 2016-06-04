;

var PAGE_SHOW = 8; // 每页显示的条目数

;
var data = page_data;
var tags = [];
var item_count = 0;
var template = undefined;


template = g('#wrap').innerHTML;

var html = [];
var show_length = PAGE_SHOW;

if( data.length < PAGE_SHOW ){
    show_length = data.length;
}
if( data.length - item_count < PAGE_SHOW ){
    show_length = data.length - item_count;
}

for( i = 0; i < show_length; i++ ){
    var _html = template.replace( /{{title}}/g, data[i].title )
                            .replace( /{{path}}/g, data[i].path )
                            .replace( /{{date}}/g, data[i].date );
    html.push( _html );
    for( s in data[i].tags){
        var _tag = data[i].tags[s];
        tags.push( _tag );
    }
}

item_count = i;
g('#wrap').innerHTML = html.join(' ');



function addPage(){
    var html = [];
    var show_length = PAGE_SHOW;

    if( data.length - item_count < PAGE_SHOW ){
        show_length = data.length - item_count;
    }

    for( i = item_count; i < show_length + item_count; i++ ){
        var _html = template.replace( /{{title}}/g, data[i].title )
                                .replace( /{{path}}/g, data[i].path )
                                .replace( /{{date}}/g, data[i].date );
        html.push( _html );
        for( s in data[i].tags){
            var _tag = data[i].tags[s];
            tags.push( _tag );
        }
    }

    item_count = i;
    g('#wrap').innerHTML += html.join(' ');

    if( data.length == item_count ){
        g('#more').innerHTML = 'finished !';
    }    
}


function showPage( path ){
    $.ajax({
        type : 'GET',
        url : path,
        dataType : "text",
        success : function( data ){
            $('#page').css({'display':'block'});
            $('#page-context').html( data );
        },
        error : function( jqXHR ){
            console.log( 123 );
            alert( jqXHR.statues );
        }
    });
}

function sortByTags(){
    for( i in tags ){

    }
}
;

$(function(){
    $('.page-close a').click(function(){
        $('#page').css({'display':'none'});
    });

});
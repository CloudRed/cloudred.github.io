;

var PAGE_SHOW = 8; // 每页显示的条目数
var HOST_NAME = 'https://cloudred.github.io';

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
    var host_name = HOST_NAME;
    var comment_count = '//cloudred.disqus..com/count-data.js?';

    if( data.length - item_count < PAGE_SHOW ){
        show_length = data.length - item_count;
    }

    for( i = item_count; i < show_length + item_count; i++ ){
        var _html = template.replace( /{{title}}/g, data[i].title )
                                .replace( /{{path}}/g, data[i].path )
                                .replace( /{{date}}/g, data[i].date );
        var c = '2=' + encodeURI(host_name + data[i].path + '#disqus_thread&');
        comment_count += c;
        html.push( _html );
        for( s in data[i].tags){
            var _tag = data[i].tags[s];
            tags.push( _tag );
        }
    }
    var data_c = 'data_c';
    alert( comment_count );
    $.ajax({
        get : 'GET',
        url : comment_count,
        dataType : 'text',
        success : function( data ){
            alert( data );
            data_c = data;
        },
        error : function( jqXHR ){
            alert( jqXHR.statues );
        }
    });
    alert( 123 );
    alert( data_c );

    item_count = i;
    g('#wrap').innerHTML += html.join(' ');

    if( data.length == item_count ){
        g('#more').innerHTML = 'finished !';
    }

    $.getScript(comment_count);
};


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
            alert( jqXHR.statues );
        }
    });
}

function manualGetCount( url ){
    $.ajax({
        type : 'GET',
        url : url,
        dataType : "text",
        success : function( data ){
            alert( data );
            return data;
        },
        error : function( jqXHR ){
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






function addCommentCount(){
    var DISQUSWIDGETS,disqus_domain,disqus_shortname;

    typeof DISQUSWIDGETS==="undefined" && ( DISQUSWIDGETS = function(){
        var f=document,
            a=f.getElementById("dsq-count-scr"),
            a=a&&a.src.match(/(https?:)?\/\/(?:www\.)?([\w_\-]+)\.((?:dev\.)?disqus\.(?:com|org)(?::\d+)?)/i),
            e={},
            s=f.head||f.body,
            j={},
            q={identifier:1,url:2};

        e.domain=a&&a[3]||disqus_domain||"disqus.com";
        e.forum=a&&a[2]||disqus_shortname;
        e.proto=a&&a[1]||"";
        e.getCount=function(b){
            var c;
            c=encodeURIComponent;
            var a=e.proto+"//"+e.forum+"."+e.domain+"/count-data.js?",
                d=[],
                k=0,
                l=10,
                r="",
                b=b||{};
            b.reset && (j={},r="&_="+ +new Date);
            for(var b=[f.getElementsByTagName("A"),f.getElementsByClassName&&f.getElementsByClassName("disqus-comment-count")||[]],m,i,g,h,n=0; n<b.length; n++){
                m=b[n];
                for(var o=0; o<m.length; o++){
                    i=m[o];
                    g=i.getAttribute("data-disqus-identifier");
                    h=i.hash==="#disqus_thread"&&i.href.replace("#disqus_thread","")||i.getAttribute("data-disqus-url");
                    if(g) h=q.identifier;
                    else if(h) g=h,h=q.url;
                    else continue;

                    var p;
                    j.hasOwnProperty(g)?p=j[g]:(p=j[g]={elements:[],type:h},d.push(c(h)+"="+c(g)));
                    p.elements.push(i)
                }
            }
            d.sort();
            
            for(c=d.slice(k,l); c.length; ) 
                b=f.createElement("script"),b.src=a+c.join("&")+r,s.appendChild(b),k+=10,l+=10,c=d.slice(k,l)
        };
        e.displayCount=function(b){
            for(var c,a,d,e=b.counts,b=b.text.comments; c=e.shift(); )
                if(a=j[c.id]){
                    switch(c.comments){
                        case 0:d=b.zero;break;
                        case 1:d=b.one;break;
                        default:d=b.multiple
                    }
                    c=d.replace("{num}",c.comments);
                    a=a.elements;

                    for(d=a.length-1;d>=0;d--)
                        a[d].innerHTML=c
                }
        };
        return e
    }());
}
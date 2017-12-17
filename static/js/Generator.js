;

var page_show = PAGE_SHOW;
var HOST_NAME = 'https://cloudred.github.io';

var data = PAGE_DATA;
var tags = [];
var item_count = 0;
var template = g('#wrap').innerHTML;


;
var html = [];
var show_length = page_show;

if( data.length < page_show ){
    show_length = data.length;
}
if( data.length - item_count < page_show ){
    show_length = data.length - item_count;
}

for( i = 0; i < show_length; i++ ){
    var _html = template.replace( /{{title}}/g, data[i].title )
                            .replace( /{{date}}/g, data[i].date )
                            .replace( /{{path}}/g, data[i].path )
                            .replace( /{{brief}}/g, data[i].brief );
    html.push( _html );
    for( s in data[i].tags){
        var _tag = data[i].tags[s];
        tags.push( _tag );
    }
}

item_count = i;
g('#wrap').innerHTML = html.join(' ');

/*////////////////////////////////////////////////////////////
// DISQUS NOW CLOSED
// IF NEED, OPEN I

// ;var DISQUS_ROOT = 'http://cloudred.disqus.com';

var disqus_root = DISQUS_ROOT;
var DISQUSWIDGETS;
var disqus_domain;
var disqus_shortname;
var DISQUSWIDGETS = function(){
    var f=document,
        a=disqus_root.match(/(https?:)?\/\/(?:www\.)?([\w_\-]+)\.((?:dev\.)?disqus\.(?:com|org)(?::\d+)?)/i),
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
}();
// 投入使用需要打开
// DISQUSWIDGETS.getCount();
////////////////////////////////////////////////////////////**/



function showPage( path ){
    $.ajax({
        type : 'GET',
        url : path,
        dataType : "text",
        success : function( data ){
            $('body').mCustomScrollbar('disable');
            $('#page').css({'display':'block'});

            setTimeout(function(){
                    $('#page').css({'opacity':'1'});
                }, 100);

            $('#page-context').html( data );
            var toc_content = $('.toc').find('a');
            for(var i = 0; i < toc_content.length; i++ ){
                var curr_content = toc_content[i];
                curr_content.setAttribute('onclick', 'gotoTarget("'+curr_content.getAttribute('href')+'")');
                curr_content.setAttribute('href', 'javascript:;');
            }

            $('#toc-content').html( $('.toc').html() );
            $('.toc').remove();


            $("#toc-content").mCustomScrollbar({
                theme : 'dark',
                // autoHideScrollbar : true,
                // scrollInertia: 100,
            });
        },
        error : function( jqXHR ){
            alert( jqXHR.statues );
        }
    });
}

function gotoTarget( tg ){
    $("#page").mCustomScrollbar('scrollTo', tg);
}

function openToc( btn_self ){
    btn_self.removeClass('toc-close');
    btn_self.addClass('toc-open');
    btn_self.html('<i class="icon-remove"></i>');
    $('.toc-bar').css({'height':'400px'});
    $('#toc-content').attr('data-display', '1');
}

function closeToc( btn_self ){
    btn_self.removeClass('toc-open');
    btn_self.addClass('toc-close');
    btn_self.html('<i class="icon-list"></i>');
    $('.toc-bar').css({'height':'0'});
    $('#toc-content').attr('data-display','0');
}

$(function(){
    // close sigle page
    $('.page-close a').click(function(){
        $('body').mCustomScrollbar('update');
        $('#page').css({'opacity':'0'});
        setTimeout(function(){
            $('#page').css({'display':'none'});
            }, 600);
        $('#toc-content').mCustomScrollbar('destroy');
        $('#toc-content').html('');
        $('#page-context').html('');
        closeToc( $('#show-toc-btn') );
    });

    $('#show-toc-btn').click(function(){
        var statue = document.getElementById('toc-content');

        if( statue.getAttribute('data-display') == '0' ){
            openToc( $('#show-toc-btn') );
        }
        else{
            closeToc( $('#show-toc-btn') );
        }
    });

    // add pages
    $('#more').click(function(){
        var html = [];
        var show_length = page_show;

        if( data.length - item_count < page_show ){
            show_length = data.length - item_count;
        }

        for( i = item_count; i < show_length + item_count; i++ ){
            var _html = template.replace( /{{title}}/g, data[i].title )
                                    .replace( /{{path}}/g, data[i].path )
                                    .replace( /{{date}}/g, data[i].date )
                                    .replace( /{{brief}}/g, data[i].brief );
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

        // DISQUSWIDGETS.getCount(); 
    });

    $('#top-btn').click(function(){
        $('body').mCustomScrollbar('scrollTo', 'top');
    });

    // slide to the bottom section (essay section)
    $('#ac').click(function(){
        $('.s-scroll').css({'transform':'translateY(-100%)'});
    });
    // slide to the right section   
    $('#me').click(function(){
        $('.s-scroll').css({'transform':'translateX(-100%)'});
    });
    // when slide, back to the main
    $('.back-main').click(function(){
        $('.s-scroll').css({'transform':'translate(0,0)'});
    });

});
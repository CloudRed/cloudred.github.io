
// addLoadEvent() 函数用于向 window.onload 上面绑定新增加的函数
function addLoadEvent( func )
{
    var oldOnload = window.onload;
    if( typeof window.onload != 'function' )
    {
        window.onload = func;
    }
    else
    {
        window.onload = function() {
            oldOnload();
            func();
        }
    }
}

// insertAfter() 函数用于向 targetElement 后面插入指定的新节点
function insertAfter( newElement, targetElement)
{
    var parent = targetElement.parentNode;
    if( parent.lastChild == targetElement)
    {
        parent.appendChild(newElement);
    }
    else
    {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// 该函数用于获取一个元素节点内所有的文本节点的内容
function getElementText( elementNode )
{
    var text = "";
    for (var i = 0; i <= elementNode.childNodes.length - 1; i++) {
        if( elementNode.childNodes[i].nodeType == 3 ){
            text += elementNode.childNodes[i].nodeValue;
        }
    }
    return text;
}

// sleep 用于程序休眠 或者 时间测试。 ms为毫秒级测试，s为秒级测试
function sleep( n, unit )
{   
    var start = new Date().getTime();
    if( unit == "s" ){
        n = n * 1000;
        while( true )
            if( new Date().getTime() - start >= n )
                break;
    }
    else{ 
        while( true )
            if( new Date().getTime() - start >= n )
                break;
    }
}

// addClass 用于向元素添加class属性，可以追加，也可以添加或者覆盖。
// 默认为覆盖, 若给定type为 increase 则在原有class基础上进行增加。
function addClass( element, value, type )
{
    if( type == "increase" ){
        newClassName = element.className + " " + value;
    }
    else{
        element.className = value;
    }
}


// 相当于 jQuery中的 $('') 选择器，非常强大！
// 根据id选择的是一个具体的元素，根据class选择的可能会是一个数组。 
function g( selector ){
    var method = selector.substr(0,1) == '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}
var project = {
    "name":         "SPR Converter",
    "author":       "SHEEP REALMS",
    "version":      "20201116a",
    "main": [
        {
            "name": "table_traslate",
        }, {
            "name": "text_loop",
        }, {
            "name": "number",
        }
    ]
};

function about() {
    $('#about-info').text('');

    function print(item,value) {
        $('#about-info').append('<dt>'+item+'</dt><dd><p>'+value+'</p></dd>');
    }

    print("项目名称",project.name);
    print("作者",project.author);
    print("版本",project.version);
    print("","<hr>");

    print("","<b>环境信息</b>");
    print("User Agent",navigator.userAgent);
    print("日期与时间",Date());
    print("时间戳",Date.now());
}
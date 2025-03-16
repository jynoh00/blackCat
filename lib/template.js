module.exports = {
    note: (fileList, t_num, des) => {
        let notes = '';
        fileList.forEach((value, index)=>{
            if (index === t_num){
                notes += `<div id = "this_des"><p id = "des_txt">${des}</p></div>`;
            }else{
                notes += `<a href = "/?id=${value}"><p class = "note_title" id = "title_${value}">${value}</p></a>`;
            }
        });
        return notes;
    },

    html: (title, note, control, catTwo) => {
        if (catTwo){
            return `
        <!DOCTYPE html>
        <html lang = "ko">
            <head>
                <meta charset = "utf-8">
                <title>black Cat</title>
                <link rel = "stylesheet" href = "style.css" type = "text/css" />
            </head>
            <body>
                <div class = "main_form">
                    <div class = "icon_form">
                        <img id = "logo_cat" src = "/img/logoCat2">
                    </div>
                    <div class = "note_form">
                        <div class = "title_form">
                            ${title}
                        </div>
                        <div class = "inner_des_form">
                            ${note}
                        </div>
                    </div>
                    <div class = "control_form">
                        ${control}
                    </div>
                </div>
                <script src = "script.js" type = "text/javascript"></script>
            </body>
        </html>
        `;
        }
        return `
    <!DOCTYPE html>
    <html lang = "ko">
        <head>
            <meta charset = "utf-8">
            <title>black Cat</title>
            <link rel = "stylesheet" href = "style.css" type = "text/css" />
        </head>
        <body>
            <div class = "main_form">
                <div class = "icon_form">
                    <img id = "logo_cat" src = "/img/logoCat">
                </div>
                <div class = "note_form">
                    <div class = "title_form">
                        ${title}
                    </div><br>
                    ${note}
                </div>
                <div class = "control_form">
                    ${control}
                </div>
            </div>
            <script src = "script.js" type = "text/javascript"></script>
        </body>
    </html>
        `;
    },
    htmlCreate: (title, control) => {
        return `
        <!DOCTYPE html>
        <html lang = "ko">
            <head>
                <meta charset = "utf-8">
                <title>black Cat</title>
                <link rel = "stylesheet" href = "style.css" type = "text/css" />
            </head>
            <body>
                <div class = "main_form">
                    <div class = "icon_form">
                        <img id = "logo_cat" src = "/img/logoCat">
                    </div>
                    <form action = "/create_process" method = "post" id = "create_box">
                    <div class = "note_form">
                        <div class = "title_form">
                            ${title}
                        </div>
                        <p><input type = "text" id = "create_title" name = "title" placeholder = "title"></p>
                        <p>
                            <textarea id = "create_des" name = "description" placeholder = "description"></textarea>
                        </p>
                    </div>
                    <div class = "control_form">
                        ${control}
                    </div>
                    </form>
                </div>
                <script src = "script.js" type = "text/javascript"></script>
            </body>
        </html>
        `;
    },
    htmlUpdate: (title, control, description) => {
        return `
        <!DOCTYPE html>
        <html lang = "ko">
            <head>
                <meta charset = "utf-8">
                <title>black Cat</title>
                <link rel = "stylesheet" href = "style.css" type = "text/css" />
            </head>
            <body>
                <div class = "main_form">
                    <div class = "icon_form">
                        <img id = "logo_cat" src = "/img/logoCat">
                    </div>
                    <form action = "/update_process" method = "post" id = "update_form">
                    <div class = "note_form">
                        <div class = "title_form">
                            <p>remake this note.</p>
                        </div>
                        <input type = "hidden" name = "id" value = "${title}">
                        <p><input type = "text" id = "update_title" name = "title" placeholder = "title" value = "${title}"></p>
                        <p>
                            <textarea id = "update_des" name = "description" placeholder = "description">${description}</textarea>
                        </p>
                    </div>
                    <div class = "control_form">
                        ${control}
                    </div>
                    </form>
                </div>
                <script src = "script.js" type = "text/javascript"></script>
            </body>
        </html>
        `;
    },
    editor: ()=>{
        return `
            <p style = "color: red;">black Cat 1.0</p>
            <h6>Just walk beside me and be my friend</h6><br>
            <h5>editor: NJY</h5>
            <h6>email: wndus123sh@naver.com</h6>
            <h6>phone: 010-4177-2114</h6><br>
            <h6>Node.js JS HTML CSS</h6>
        `;
    }
};
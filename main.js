// path 방식 http protocol 사용, GET, POST 등 사용 권장
const http = require('http'); // web - protocol, request와 response.
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const folder = './data';
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const requestIp = require('request-ip');

let application = http.createServer((request, response) => {
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;

    if (pathname === `/`){
        fs.readdir(folder, (err, fileList)=>{
            console.log(requestIp.getClientIp(request));
            if (queryData.id === undefined){
                console.log('main-PAGE now');
            }else console.log(`${queryData.id}-PAGE now`);
            
            if (queryData.id === undefined){
                let title = 'Welcome!';
                let note = template.note(fileList);
                let control = `
                <a href = "/create" class = "bt_style">생성</a>
                <a href = "/" class = "bt_style">🐈‍⬛</a>
                <a href = "/editor" class = "bt_style">제작</a>
                `;
                let HTML = template.html(title, note, control, 0);
                response.writeHead(200);
                response.end(HTML);
            }else{
                let filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', (err, description)=> {
                    let title = queryData.id;
                    let sanitizeTitle = sanitizeHtml(title);
                    let sanitizeDes = sanitizeHtml(description);
                    let this_num = fileList.indexOf(sanitizeTitle);
                    let control = `
                    <a href = "/update?id=${sanitizeTitle}" class = "bt_style">수정</a>
                    <a href = "/" class = "bt_style">🐈‍⬛</a>
                    <form method = "post" style = "display: inline;" id = "delete_form">
                        <input type= "hidden" name = "id" value = "${sanitizeTitle}">
                        <input type = "submit" id = "delete_sub" class = "bt_style" value = "삭제" onclick = "delete_click();">
                    </form>
                   `;
                    let HTML = template.html(sanitizeTitle, sanitizeDes, control, 1);
                    response.writeHead(200);
                    response.end(HTML);
                });
            }
        });
    }else if (pathname === '/editor'){
        let title ='BLACK🐈‍⬛CAT';
        let note = template.editor();
        let control = `
            <a href = "/" class = "bt_style">🐈‍⬛</a>
            <a href = "/" class = "bt_style">🐈‍⬛</a>
            <a href = "/" class = "bt_style">🐈‍⬛</a>
            `;
        let HTML = template.html(title, note, control,0);
        response.writeHead(200);
        response.end(HTML);
    }else if (pathname === '/create'){
        fs.readdir(folder, (err, fileList)=>{
            let title = 'Create your today';
            let control = `
            <input type = "submit" id = "create_sub" class = "bt_style" value = "확인">
            <a href = "/" class = "bt_style">🐈‍⬛</a>
            <a href = "/" class = "bt_style">취소</a>
            `;
            let HTML = template.htmlCreate(title, control);
            response.writeHead(200);
            response.end(HTML);
        });
    }else if (pathname === '/create_process'){
        let body = '';
        request.on('data', data =>{
            body += data;
        });
        request.on('end', () => {
            let post = qs.parse(body);
            let title = post.title;
            let description = post.description;

            let filteredId = path.parse(title).base;
            fs.writeFile(`data/${filteredId}`, description, 'utf8', err => {
                console.log('note saved...');
                response.writeHead(302, {Location : encodeURI(`/?id=${filteredId}`)});
                response.end();
            });
        });
    }else if (pathname === '/update'){
        console.log('update-form now');
        fs.readdir('./data', (error, fileList)=>{
            let filteredId = path.parse(queryData.id).base;
            console.log(filteredId);
            fs.readFile(`data/${filteredId}`, 'utf8', (err, description)=>{
                let title = queryData.id;
                let control = `
                <input type = "submit" id = "update_sub" class = "bt_style" value = "저장">
                <a href = "/" class = "bt_style">🐈‍⬛</a>
                <a href = "/" class = "bt_style">취소</a>
                `;
                let HTML = template.htmlUpdate(title, control, description);
                response.writeHead(200);
                response.end(HTML);
            });
        });
    }else if (pathname === '/update_process'){
        let body = '';
        request.on('data', data => {
            body += data;
        });
        request.on('end', ()=>{
            let post = qs.parse(body);
            let id = post.id;
            let title = post.title;
            let description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, err =>{
                fs.writeFile(`data/${title}`, description, 'utf8', error=>{
                    console.log('note changed.');
                    response.writeHead(302, {Location: encodeURI(`/?id=${title}`)});
                    response.end();
                });
            });
        });

    }else if (pathname === '/delete_process'){ //delete_process improve needs
        let body ='';
        request.on('data', data=>{
            body += data;
        });
        request.on('end', ()=>{
            let post = qs.parse(body);
            let id = post.id;
            let filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, err => {
                if (err) throw err;
                response.writeHead(302, {Location: '/'});
                response.end();
            });
        });
    }else if (pathname === '/script.js'){
        fs.readFile('script.js', 'utf8', (err, description)=>{
            response.writeHead(200);
            response.write(description);
            response.end(); 
        });
    }else if (pathname === '/style.css'){
        fs.readFile('style.css', 'utf8', (err, description)=>{
            response.writeHead(200);
            response.write(description);
            response.end(); 
        });
    }else if (pathname === '/img/logoCat'){
        fs.readFile('./img/logoCat.JPG', (err, description)=>{
            response.writeHead(200);
            response.write(description);
            response.end();
        });
    }else if (pathname === '/img/logoCat2'){
        fs.readFile('./img/logoCat2.JPG', (err, description)=>{
            response.writeHead(200);
            response.write(description);
            response.end();
        });
    }else{
        response.writeHead(404);
        let HTML = `
        404 not found
        `;
        response.end(HTML);
    }
});

application.listen(3000, '0.0.0.0',() => {
    console.log('open now...');
});

/*
    patch note.

    1.0 :
        기본 동작, UI 구현

    1.1 :
        note 스크롤 기능 추가
        note 생성일 순으로 정렬 
    */
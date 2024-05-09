const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const { name } = require('ejs');

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res)=>{
    fs.readdir(`./files`,(err,files)=>{
            res.render("index", {files: files})
        });
});
app.get('/files/:filename', (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8" ,(err, filedata)=>{
        res.render('show', {filename: req.params.filename, filedata: filedata})
    })
});
app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=>{
        res.redirect("/")
    })
});
app.get('/edit/:filename', (req, res)=>{
    res.render('edit', {filename: req.params.filename})
});
app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.previousname}`,`./files/${req.body.newname}`,(err)=>{
        res.redirect("/")
    })
});
app.get('/editdata/:filename', (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8" ,(err, filedata)=>{
        res.render('editdata', {filedata: filedata})
    })
});


//ToDo
app.post('/editdata', (req, res)=>{
    fs.appendFile(`./files/${req.params.filename}.txt`,req.body.newdata ,(err)=>{
        console.log(req.body.newdata)
        res.redirect(`/`)
    })
});


app.listen(3000);
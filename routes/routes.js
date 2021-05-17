const file = require('./Personages.json');
const fs = require('fs');
var path = require('path');
const express = require('express');

const router = app => {
    app.get('/', (request, response) => {
        response.send({
            message: 'Перейдите по адресу: http://localhost:3010/shrekapi'
        });
    });


   app.get('/shrekapi', (request, response) => {
        response.sendFile(__dirname + '/HTML/index.html', 'utf8');
        app.use(express.static(path.join(__dirname, '/HTML')));
    });


    app.get('/search/:id', (request, response) => {
        try
        {
            var index = file.data.findIndex(i => i.id == request.params.id);
            if(index == -1)
            {
                var resp = {data:[]};
                response.status(200).send(resp);
                return;
            }
            var resp = {data:[file.data[index]]};
            response.status(200).send(resp);
        }
        catch
        {
            response.status(404).send("error");
        }
    });
    app.post('/search', (request, response) => {
            try
            {
                var item = {id:parseInt(request.body.id), name:request.body.name, sex:request.body.sex, race:request.body.race, image:request.body.image};
                if(file.data.findIndex(i => i.id == item.id) != -1)
                {
                    response.send("id already exists");
                    return;
                }
                file.data.push(item);    
                pushToJson();
                response.status(200).send('Personage added');
            }
            catch
            {
                response.send("error");
            }
        });
    
        app.put('/search/:id', (request, response) => {
            try
            {
                var item = {id:parseInt(request.body.id), name:request.body.name, sex:request.body.sex, race:request.body.race, image:request.body.image};
                var id = parseInt(request.params.id);
                var index = file.data.findIndex(i => i.id == id);
                if(index == -1)
                {
                    response.send("id not founded");
                    return;
                }
                file.data[file.data.findIndex(i => i.id == id)] = item;
                pushToJson();
                response.send("PUT ok");
            }
            catch
            {
                response.send("error");
            }
        });
    
        app.delete('/search/:id', (request, response) => {
            try
            {
                var id = parseInt(request.params.id);
                var index = file.data.findIndex(i => i.id == id);
                if(index == -1)
                {
                    response.send("id not founded");
                    return;
                }
                file.data.splice(index,1);
                pushToJson();
                response.send("DELETE ok");
            }
            catch
            {
                response.send("error");
            }
        });
}

// Export the router
module.exports = router;

function pushToJson ()
{
    fs.writeFile('./routes/PersonagesFormatted.json', JSON.stringify(file), function(err) {
        if (err) {
        console.log(err);
        }
    });
}
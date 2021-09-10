// Importando módulos necesarios
const http = require('http');
const fs = require('fs');
const url = require('url');

// Importando funciones desde ./consultas.js
const { insertar,consultar,editar,eliminar } = require('./consultas')

http
    .createServer(async (req,res) => {

        // Ruta raíz
        if( req.url == '/' && req.method == 'GET'){
            res.setHeader('content-type','text/html');
            const html = fs.readFileSync('index.html','utf8');
            res.end(html);
        }

        // Ruta POST
        if ( req.url == '/cancion' && req.method == 'POST')  {
            
            let body = '';
            
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', async () => {

                const datos = Object.values(JSON.parse(body));
                const respuesta = await insertar(datos);
                res.end(JSON.stringify(respuesta,null,1));
            })
        }

        // Ruta GET
        if ( req.url == '/canciones' && req.method == 'GET') {
            const registros = await consultar();
            res.end(JSON.stringify(registros,null,1));
        }

        // Ruta PUT
        if ( req.url == '/cancion' && req.method == 'PUT') {
            let body = '';
            
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', async () => {
                const datos = Object.values(JSON.parse(body));

                /* console.log(datos); */

                const respuesta = await editar(datos);
                res.end(JSON.stringify(respuesta));
            })
        }

        // Ruta DELETE
        if (req.url.startsWith('/cancion?') && req.method == 'DELETE') {
            const { id } = url.parse(req.url,true).query;

            const respuesta = await eliminar(id);
            res.end(JSON.stringify(respuesta))
        }

    })
    .listen(3000,()=>console.log(`Server running on port 3000 and PID: ${process.pid}`))
// Importando módulos necesarios
const { Pool } = require('pg');

// Nueva instancia de la clase Pool pasándole el objeto de configuración
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "password",
    port: 5432,
    database: "repertorio",
})

// Función asincrónica para insertar 
const insertar = async (datos) => {
    //Consulta parametrizada
    const consulta = {
        text: 'INSERT INTO repertorio (cancion,artista,tono) VALUES ($1,$2,$3) RETURNING *',
        values:datos,
    }

    // Try-catch para generar la consulta
    try{
        const result = await pool.query(consulta);
        console.log(`Registro agregado con éxito.`);
        return result;
    } catch (error){
        console.log(error.code);
        return error;
    }
    
}

// Función asincrónica para consultar
const consultar = async () => {
    // Try-catch para generar la consulta
    try {
        const result = await pool.query('SELECT * FROM repertorio');
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

// Función asincrónica para editar
const editar = async (datos) => {

    //Consulta parametrizada
    const consulta = {
        text:`UPDATE repertorio SET
        cancion = $2,
        artista = $3,
        tono = $4
        WHERE id = $1 RETURNING *;`,
        values: datos,
    };

    // Try-catch para generar la consulta
    try {
        const result = await pool.query(consulta);
        console.log(`Registro actualizado con éxito.`);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Función asincrónica para eliminar
const eliminar = async (id) => {

    // Try-catch para generar la consulta
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id = '${id}'`)
    } catch (error) {
        console.log(error.code);
        return(error)
    }
}

// Exportando funciones
module.exports = { insertar,consultar,editar,eliminar };
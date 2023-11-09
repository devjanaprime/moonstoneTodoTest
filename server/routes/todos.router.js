const router = require('express').Router();
const pool = require('../modules/pool');


router.delete( '/', (req, res)=>{
    console.log( 'in DELETE:', req.query );
    const queryText = `DELETE FROM todos WHERE id=$1`;
    let values = [ req.query.id ];
    pool.query( queryText, values ).then( (results)=>{
        res.send( 200 );
    }).catch( (err)=>{
        console.log( err );
        res.send( 500 );
    })
})

router.get( '/', (req, res)=>{
    console.log( 'in GET');
    const queryText = `SELECT * FROM todos`;
    pool.query( queryText ).then( (results)=>{
        res.send( results.rows );
    }).catch( (err)=>{
        console.log( err );
        res.send( 500 );
    })
})

router.post( '/', (req, res)=>{
    console.log( 'in POST:', req.body );
    const queryString = `INSERT INTO "todos"
        ("text")
        VALUES 
        ($1)`;
    values = [ req.body.text ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 201 );
    }).catch( (err)=>{
        console.log( err );
        res.send( 500 );
    })
})


router.put( '/', ( req, res )=>{
    console.log( 'in PUT:', req.query );
    let queryString = `UPDATE todos SET "isComplete"=TRUE WHERE id=$1;`;
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( (err)=>{
        console.log( err );
        res.sendStatus( 500 );
    }) // end query
})


module.exports = router;

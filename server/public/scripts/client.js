console.log('JS is sourced!');

function addTask(){
    axios.post('/todos', { text: document.getElementById('taskIn').value }).then( ( response )=>{
        console.log( response.data );
        getTodos();
    }).catch( (err)=>{
        console.error( err );
        alert( 'no worky' );
    })
}

function completeTask(id){
    console.log( 'in completeTask:', id );
    axios.put(`/todos?id=${id}`).then( (response)=>{
        console.log( response );
        getTodos();
    }).catch( ( err )=>{
        console.error( err );
        alert( 'nope' );
    })
}

function deleteTask(id){
    console.log( 'in deleteTask:', id );
    axios.delete(`/todos?id=${id}`).then( (response)=>{
        console.log( response );
        getTodos();
    }).catch( ( err )=>{
        console.error( err );
        alert( 'nope' );
    })
}

function getTodos(){
    axios.get('/todos').then( ( response )=>{
        console.log( response.data );
        // update DOM
        renderList(response.data);
    }).catch( (err)=>{
        console.error( err );
        alert( 'no worky' );
    })
}


function renderList(list){
    const el = document.getElementById( 'todoOut' );
    let appendText = '';
    for( item of list ){
        appendText += `<li>`;
        if( item.isComplete ) appendText += `<strong>`;
        appendText += `${item.text}`;
        if( item.isComplete ) appendText += `</strong>`;
        else appendText += `<button onClick="completeTask(${item.id})">Complete</button>`;
        appendText += `<button onClick="deleteTask(${item.id})">Delete</button></li>`;
    } // end for
    el.innerHTML = appendText;
}

getTodos();

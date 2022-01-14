//selectors

const postSearch = document.querySelector('#search')
const postListUL = document.querySelector('.collection')
const postInput = document.querySelector('.post-field')
const postSubmit = document.querySelector('.post-btn')
const postDelete = document.querySelector('.delete-post')
const msg = document.querySelector('.msg')

//data / state
let postData = []

//local storage
//=================
//get data from local storage
function getDataFromLocalStorage(){
    let items = ''
    if(localStorage.getItem('postItems') === null){
        items = []
    }
    else{
        items = JSON.parse(localStorage.getItem('postItems'))
    }
    return items
}


//save data into local storage
function saveDataToLoacalStorage(item){
    let items = ''
    if(localStorage.getItem('postItems') === null){
        items = []
        items.push(item)
        localStorage.setItem('postItems', JSON.stringify(items))
    }else{
       items = JSON.parse(localStorage.getItem('postItems'))
       items.push(item)
       localStorage.setItem('postItems' , JSON.stringify(items))
    }
}

//delete data from local storage
function deleteItemFromLocalStorage(id){
    const items =JSON.parse(localStorage.getItem('postItems'))
    const result = postData.filter( postItem =>{
        return postItem.id !== id
    })
    localStorage.setItem('postItems' , JSON.stringify(result))
    if (result.length === 0) location.reload()
}

//get a post in the UI
//======================
function getPost(post){
    if( postData.length > 0){
        
        let li = ''
        post.forEach(element => {
            li = document.createElement('li')
            li.className = 'bg-light list-group-item collection-item'
            li.id = `post-${element.id}`
            li.innerHTML = `<span class="postText">${element.text}</span>
            <i class="fas fa-trash float-right delete-post"></i>
            <i class="fas fa-pencil-alt float-right edit-btn mr-1"></i>`
             
            postListUL.appendChild(li)
            msg.innerHTML = ''
        });
    }else{
        showMessage('There is no post to show')
    }
}

getPost(postData)


//Create a post(dynamically) when the submit button is trigered
//=============================================================
postSubmit.addEventListener('click' , (e)=>{
    e.preventDefault()
    const post = postInput.value
    let id ;
    if(postData.length === 0){
        id = 0
    }else{
        id = postData[postData.length-1].id + 1
    }
    if(post === ''){
        alert('Your Post is invalid!')
    }else{
        const data = {
            id ,
            text : post
        }
        postData.push(data)
        saveDataToLoacalStorage(data)
        postListUL.innerHTML = ''
        getPost(postData)
        postInput.value = ''
    }
    
})


//delete a data from the data list
//==================================

postListUL.addEventListener('click', (e)=> {
    if(e.target.classList.contains('delete-post')) {

        const target = e.target.parentElement
        
        //delete from UI
        e.target.parentElement.remove(target)
        //delete from local state
        const id = parseInt(target.id.split('-')[1]);
        deleteItemFromLocalStorage(id)
        // const result = postData.filter( post =>{
        //     return post.id !== id
        // })
        // postData = result
    }
})

//search a post on searchbar(by every alphabet)
//==============================================
postSearch.addEventListener('keyup', e =>{
    const text = e.target.value
    document.querySelectorAll('.collection .collection-item').forEach(item =>{
        const searchPost = item.firstElementChild.textContent
        if(searchPost.indexOf(text) === -1){
            showMessage('There is not such post')
            item.style.display = 'none'
        }else{
            item.style.display = 'block'
        }
    })
})

// a message function to show 
//===========================
function showMessage(message){
    msg.innerHTML = message
}
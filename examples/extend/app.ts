import axios from '../../src/index';


// axios({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//       msg: 'hi'
//     }
// })
  
// axios.request({
//     url: '/extend/post',
//     method: 'post',
//     data: {
//         msg: 'hello'
//     }
// })

// axios('/extend/post', {
//     method: 'post',
//     data: {
//         msg: 'test'
//     }
// })
  
// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })


interface ResponseData<T = any> {
    code: number
    result: T
    message: string
}

interface User {
    name: string
    age: number
}

function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.error(err))
}


async function test2() {
    const user = await getUser<User>();
    console.log(user);
}

test2();
// getUser<User>();
// console.log(axios)

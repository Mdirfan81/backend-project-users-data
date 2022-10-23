# backend-project-users-data
Test API with this url :- https://backend-user-api.onrender.com/api/allUsers

/allUsers for getting all users.
getUser/:id. single user.
###ex:1
GET https://backend-user-api.onrender.com/api/allUsers


### ex:3
GET https://backend-user-api.onrender.com/getUser/6



###Auth
POST  https://backend-user-api.onrender.com/api/auth
Content-Type:application/json 

{

    "email":"test1@gmail.com" 
}




### ex:2
POST https://backend-user-api.onrender.com/api/create
Content-Type:application/json
    
{
    "firstName":"122 new",
    "lastName":"ttt 331",
    "email":"____@gmail.com" 
}


###Put request
PUT https://backend-user-api.onrender.com/api/update/3
Content-Type:application/json
    
{
    "firstName":"Toltal new updating id 2",
    "lastName":"ttt 12222",
    "email":"newInddshfian1@gmail.com",
    "avatar": "https://cdn.fakercloud.com/avatars/coreyginnivan_128.jpg"
}



###Delete
DELETE  https://backend-user-api.onrender.com/api/delete/1








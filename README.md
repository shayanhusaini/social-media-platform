# Social Media Platform

Steps to run this project:

1. Run `npm i` command
2. Run `npm run start` command

## How to Make API Request
1. Use the following value in `Client-Auth` header `Basic dGVzdENsaWVudDp0ZXN0UGFzc3dvcmQ=` otherwise API's will throw unauthorized error
2. Call `/user/signup` request first to create your user and get the authentication token
3. Use the token value in `Authorization` header in following format `Bearer {{token}}` to call the post API's


## Notes:
1. The password's are stored in plain text as the bcrypt library is currently not supported in Mac M1. For more details visit this link:
https://github.com/kelektiv/node.bcrypt.js/issues/868
2. Although the passwords are stored in plain text but approach to match the user credentials is taken in a similar way as they are stored in encrypted format.



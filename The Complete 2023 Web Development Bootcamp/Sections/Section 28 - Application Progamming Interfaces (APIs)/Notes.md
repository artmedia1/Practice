## Useful for viewing JSON
```
https://jsonviewer.stack.hu/
```

## Turn JS Object into JSON and vice versa
```
const jsonData  = JSON.stringify(data); # Turn JS Object into JSON
const data = JSON.parse(jsonData); # Turn JSON into JS Object
```

# Axios Common Methods
https://axios-http.com/docs/api_intro

## GET request
Used to retrieve data from a server.
```javascript
const url = 'https://api.example.com/data';
axios.get(url);
```

## POST request
Used to send data to a server.
```javascript
const url = 'https://api.example.com/data';
const data = {
  name: 'John Doe',
  age: 30
};
axios.post(url, data);
```

## PUT request
Used to update an existing resource on the server.
```javascript
const url = 'https://api.example.com/data/1';
const updatedData = {
  name: 'John Doe',
  age: 31
};
axios.put(url, updatedData);
```

## DELETE request
Used to remove a resource from the server.
```javascript
const url = 'https://api.example.com/data/1';
axios.delete(url);
```

## HEAD request
Similar to a GET request but only retrieves the headers of the response, not the actual data.
```javascript
const url = 'https://api.example.com/data';
axios.head(url);
```

## OPTIONS request
Used to retrieve the allowed methods on a resource.
```javascript
const url = 'https://api.example.com/data';
axios.options(url);
```

## PATCH request
Used to apply partial updates to a resource.
```javascript
const url = 'https://api.example.com/data/1';
const partialData = {
  age: 32
};
axios.patch(url, partialData);
```

## Generic REQUEST method
Allows you to make a request using any HTTP verb.
```javascript
const config = {
  method: 'get',
  url: 'https://api.example.com/data'
};
axios.request(config);
```

## Api Authorization vs Authentication
Authentication: Allows you to be identified as a user to the API provider - User can authenticate themselves and then one authenticated, can authorize themselves
Authroization: Allows you to use the API - Client that has authorization


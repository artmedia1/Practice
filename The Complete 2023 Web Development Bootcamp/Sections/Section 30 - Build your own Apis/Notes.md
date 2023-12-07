## What makes an API Restful?
1.  Standard HTML Methods

        HTTP Methods: RESTful URIs are typically used with HTTP methods (GET, POST, PUT, DELETE, etc.) to perform operations on the resources. For example, GET is used to retrieve a resource, POST to create a new resource, PUT to update an existing resource, and DELETE to remove a resource.
    
2.  Standard data format (i.e, JSON or XML)

        When a client request is made via a RESTful API, it transfers a representation of the state of the resource to the requester or endpoint. This information, or representation, is delivered in one of several formats via HTTP: JSON (Javascript Object Notation), HTML, XLT, Python, PHP, or plain text. JSON is the most generally popular file format to use because, despite its name, it’s language-agnostic, as well as readable by both humans and machines. 

3.  Client and Server are separate

        A client-server architecture made up of clients, servers, and resources, with requests managed through HTTP. This allows the client and server to scale independently from each other

4.  Statelessness

        Stateless client-server communication, meaning no client information is stored between get requests and each request is separate and unconnected. Each single request and response can be complete without knowing what happened previously. This allows for better scaling and simplifies the server-side implementation. Whenever the client sends a request, the request sends all the required information for the response. 
        Stateless Communication: RESTful services are stateless, meaning that each request from client to server must contain all the information needed to understand and process the request. The URI itself should be descriptive and self-explanatory.

5. Resource-based

        In REST, every piece of information is considered a resource. This could be a document, a photo, a temporal service (e.g., today's weather in London), a collection of other resources, a non-virtual object (e.g., a person), and so on.

        Uniform Resource Identifier (URI): A resource in REST is identified by a Uniform Resource Identifier, typically a URL in web services. This URI is a unique address used to access the resource.
        
        Consider a RESTful web service for a library system. Here are some example URIs with their corresponding actions:
        GET /books: Retrieves a list of all books in the library.
        GET /books/123: Retrieves details of the book with ID 123.
        POST /books: Creates a new book entry (details provided in request body).
        PUT /books/123: Updates the book with ID 123 (updated details provided in request body).
        DELETE /books/123: Deletes the book with ID 123.

        Each URI represents a specific resource or a collection of resources and is used with appropriate HTTP methods to perform actions on those resources.

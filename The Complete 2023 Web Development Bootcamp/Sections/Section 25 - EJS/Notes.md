# EJS Tags

EJS (Embedded JavaScript) tags allow you to embed JavaScript directly into your HTML templates. Here's a quick reference to some commonly used EJS tags:

## 1. JS Output
Output a JavaScript variable or expression directly into your HTML.
```
<%= variable %>
```

## 2. JS Execute
Execute a JavaScript statement without rendering its output.
```
<% console.log("hello") %>
```

## 3. Render HTML
Render HTML content directly from your JavaScript.
```
<%- <h1>Hello</h1> %>
```

## 4. Show <% or %>
If you want to literally display the EJS delimiters, use this syntax.
```
<%% %%> 
```

## 5. Stop Execution 
Add a comment in your EJS template that won't be rendered in the final HTML.
```
<%# This is a comment %>
```

## 6. Insert another EJS file 
Include content from another EJS file.
```
<%- include("header.ejs") %>
```


## Passing Data
EJS does not scope, so you cannot do something like checking if something exists
```
<%= if (fruits) { %>
    <ul>
        <%fruits.forEach((fruit) => { %>
            <li>
                <%=fruit %>
            </li>
        <%}) %>
    </ul>
<% } %>
```
What you can do instead is use locals.
```
<%= if (locals.fruits) { %>
    <ul>
        <%fruits.forEach((fruit) => { %>
            <li>
                <%=fruit %>
            </li>
        <%}) %>
    </ul>
<% } %>
```

## Using static files, e.g. our images and css
Developers usually put their static files in a public folder.
- Images in public/images/
- css in public/styles/

```
app.use(express.static("public"));
```
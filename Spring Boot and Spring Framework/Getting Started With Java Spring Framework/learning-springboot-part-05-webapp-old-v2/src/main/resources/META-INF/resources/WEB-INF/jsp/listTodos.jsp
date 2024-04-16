<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<html>
	<head>
		<title>Manage Your Todos</title>
	</head>
	<body>
		<div class="container">
        			<h1>Your Todos ${name}</h1>
        			<table class="table">
        				<thead>
        					<tr>
        						<th>Description</th>
        						<th>Target Date</th>
        						<th>Is Done?</th>
        					</tr>
        				</thead>
        				<tbody>
        					<c:forEach items="${todos}" var="todo">
        						<tr>
        							<td>${todo.description}</td>
        							<td>${todo.targetDate}</td>
        							<td>${todo.done}</td>
        						</tr>
        					</c:forEach>
        				</tbody>
        			</table>
        			<a href="add-todo" class="btn btn-success">Add Todo</a>
        		</div>
	</body>
</html>
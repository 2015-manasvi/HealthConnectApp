LOGIN PAGE:

1.Display the login page with two buttons one for Staff Login another for Patient Login
2.In staff login page, login with StaffNRIC number and password.In Patient login page, login with patient Mobile number and password.
3.Show home page when login is successfull.
4.Cannot enter home page when login fails.

TECHNOLOGY USED:

React JS,HTML,CSS,MUI,Mongo DB
1.Declare react states for roles,user and password.Set roles through the choosing of buttons either staff or patient.UseContext to save role and user.
2.Add function handleClick to login,first fetch() call added the end points as the first mandatory parameter,second parameter takes in the request parameter(POST) .
3.Component render based on condition,if role is equal to staff, setAuthorised with staffnric and password.If role is equal to patient, setAuthorised with patient contact number and password.
4.In return Method, use HomeLogo image, CSS for styling the page and MUI for styling the buttons.
5.Use conditional rendering, if no role selected, show role option buttons. Once role selected shows input boxes for user and password.
6.In Login Button,onClick attribute is set to the handleLogin function as the event target.

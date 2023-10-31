## Building Blocks of a Web Application

There are a few things you need to consider when building modern applications. Such as:

User Interface - how users will consume and interact with your application.
Routing - how users navigate between different parts of your application.
Data Fetching - where your data lives and how to get it.
Rendering - when and where you render static or dynamic content.
Integrations - what third-party services you use (CMS, auth, payments, etc) and how you connect to them.
Infrastructure - where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).
Performance - how to optimize your application for end-users.
Scalability - how your application adapts as your team, data, and traffic grow.
Developer Experience - your team’s experience building and maintaining your application.

# DOM - Document Object Model 

The dom represents the content of xml or html doucments as a tree structure 

The dom is an API which can be used with programming languages to read, access, and update contents of the document 

Document - html file
Object - tags/elements
Model - layout/structure

The HTML represents the inital page content while the DOM represents the updated page content manipulated by the javascript code


# DOM Methods

You can use dom methods and a programming language to listen to user events and manipulate the DOM by selecting, adding, updating, and deleting specific elements in the user interface. 

DOM manipulation allows you to not only target specific elements, but also change their style and content.

Dom has functions like .getElementByTagName("title)[0].childNodes[0].nodeValue to get the text value of the first <title> element 

<script type="text/javascript">
  const app = document.getElementById('app');
  const header = document.createElement('h1');
  const headerContent = document.createTextNode('Develop. Preview. Ship. 🚀');
  header.appendChild(headerContent);
  app.appendChild(header);
</script>

The prior is code to add an <h1> element with some text

# Imperative vs Declarative Programming

This is a lot of code for not to much results and as the size of apps increase, it makes it hard to scale. This approach is called imperative programming (telling the computer exactly how to do things step by step)

React allows us to speed up the process with a delarative programming (instead of writing DOM methods allows developers to declare "what" they want to happen to the UI instead of writing out all the steps "how" to update it becuase react will figure out how to update the DOM on your behalf)

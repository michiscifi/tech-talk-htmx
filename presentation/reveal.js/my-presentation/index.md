## HTMX
<img src="my-presentation/back-to-the-future.png" alt="Beschreibung" style="width: 500px;">
---
<!-- .slide: data-background-image="my-presentation/matrix.jpg" data-background-size="cover" -->
"In the beginning was the hyperlink, and the hyperlink was with the web, and the hyperlink was the web. 
And it was good."

— Rescuing REST From the API Winter, https://intercoolerjs.org/2016/01/18/rescuing-rest.html

Note:
"Am Anfang war der Code und der Code war beim Netz.
Und das Netz war der Code.
Die Dunkelheit konnte es nicht zerstören..."
— Tim, 1:1
---
## Dramatis Personae
---
## Tim Berners-Lee (1989)

Physiker am CERN

- Erfand HTML, HTTP, URLs
- Vision: Dokumente verlinken, Server sendet HTML
---
## Roy Thomas Fielding (2000)

REST-Apologet

- Dissertation: "Architectural Styles and the Design of Network-based Software Architectures"
- HATEOAS: "Hypermedia As The Engine Of Application State"
- Server sendet nicht nur Daten, sondern auch nächste Aktionen

--

https://roy.gbiv.com/pubs/dissertation/fielding_dissertation.pdf

---

## Douglas Crockford (2001)

JSON-Erfinder
- "JavaScript: The Good Parts"
- JSON als Antwort auf XML
- ermöglicht die JavaScript-Frameworks für SPAs

---

## Carson Gross (2020)

HTMX-Erfinder

- Entwickler aus Montana
- was, wenn Browser nicht nur links und ```<form method="POST">``` können, sondern auch den Rest von REST?
- https://htmx.org/
- https://hypermedia.systems/

--

https://hypermedia.systems/hypermedia-a-reintroduction/

---

# Akt I 

---

1990

Tim Berners-Lee erfindet das Web, um sich und seinen Kollegen die Arbeit zu erleichtern

--

<q style="font-size: 0.6em">
Creating the web was really an act of desperation, 
because the situation without it was very difficult 
when I was working at CERN later. 
Most of the technology involved in the web, 
like the hypertext, like the Internet,
multifont text objects, had all been designed already.
I just had to put them together.
It was a step of generalising, going to a higher level of abstraction, 
thinking about all the documentation systems out there as
being possibly part of a larger imaginary documentation system.
</q>
---
## Die Magie der Hyperlinks

Du bestellst in einem Cafe einen Espresso und bekommst noch einen Keks dazu.
Und wenn du dich entschieden hast den Keks zu knabbern bekommst du eine
Schokolade ...

---
<!-- .slide: data-background-image="my-presentation/matrix.jpg" data-background-size="cover" -->

- Netz ein chaotischer Graph
- Knoten *enthält* Informationen über die Nachbarknoten und über sich selbst
- Browser (hypermedia clients) bleiben standardisiert
- es ist kein zentrales Register nötig

Note:
Man stelle sich das Netz als einen chaotischen Graphen vor - 
ein Knoten *enthält* Informationen über die Nachbarknoten und über sich selbst - 
so können die Browser (hypermedia clients) dumm bleiben, 
was eine gute Sache ist bei einem chaotischen Netz.

---

## Hypermedia

- Hypermedia vereint Daten und Verhalten
- Der Server liefert Hypermedia (HTML)
- Diese Hypermedia enthält:
- Links (Navigation) (GET)
- Forms (Zustandsänderung) (POST)
- Browser versteht Hypermedia

---

```html
<a href="https://hypermedia.systems/">
  Hypermedia Systems
</a>
```

Note:

https://hypermedia.systems/hypermedia-a-reintroduction/

The Essence of HTML as a Hypermedia
Let us consider these two defining hypermedia elements (that is the two defining hypermedia controls) of 
HTML, the anchor tag and the form tag, in a bit of detail.

Anchor tags
Anchor tags are so familiar as to be boring but, as the original hypermedia control, it is worth reviewing 
the mechanics of hyperlinks to get our minds in the right place for developing a deeper understanding of hypermedia.

Consider a simple anchor tag, embedded within a larger HTML document:

<a href="https://hypermedia.systems/">
  Hypermedia Systems
</a>
A simple hyperlink

An anchor tag consists of the tag itself, <a></a>, as well as the attributes and content 
within the tag. Of particular interest is the href attribute, which specifies a hypertext reference 
to another document or document fragment. It is this attribute that makes the anchor tag a hypermedia control.

In a typical web browser, this anchor tag would be interpreted to mean:

Show the text “Hypermedia Systems” in a manner indicating that it is clickable

When the user clicks on that text, issue an HTTP GET request to the URL https://hypermedia.systems/

Take the HTML content in the body of the HTTP response to this request and replace the entire screen 
in the browser as a new document, updating the navigation bar to this new URL.

Anchors provide the main mechanism we use to navigate around the web today, by selecting links to
navigate from document to document, or from resource to resource. [fig-get-in-action] shows what a 
user interaction with an anchor tag/hyperlink looks like in visual form.

┌────────────────────────┐      ┌─HTTP REQUEST────────────────┐
│ BROWSER              X │      │                             │
├────────────────────────┤      │ GET /                       │
│                        │      │ Host: hypermedia.systems    │
│ lorem ipsum dolor      │      └─────────────────────────────┘
│                        │
│ Hypermedia Systems ────┼───────────┐
│ ──────────────────     │           │
│ sit amet               │           │
│                        │           │
└────────────────────────┘           │
┌──────▼──────┐
│   H T T P   │
│ S E R V E R │
└──────┬──────┘
┌────────────────────────┐           │
│ BROWSER              X │           │
├────────────────────────┤           │
│                        │           │
│ HYPERMEDIA SYSTEMS     ◀───────────┘
│                        │
│ The revolutionary      │      ┌─HTTP RESPONSE───────────────┐
│                        │      │                             │
│ ideas that empowered...│      │ 200 OK                      │
│                        │      │ ...                         │
└────────────────────────┘      │ <h1>Hypermedia Systems</h1> │
│ ...                         │
└─────────────────────────────┘
An HTTP GET In Action

When the link is clicked the browser (or, as we sometimes refer to it, the hypermedia client) initiates an
HTTP GET request to the URL encoded in the link’s href attribute.

Note that the HTTP request includes additional data (i.e., metadata) on what, exactly, the browser wants 
from the server, in the form of headers. We will discuss these headers, and HTTP in more depth in Chapter 2.

The hypermedia server then responds to this request with a hypermedia response — the HTML — for the 
new page. This may seem like a small and obvious point, but it is an absolutely crucial aspect of a 
truly RESTful hypermedia system: the client and server must communicate via hypermedia!


---

# Akt II

---

## Das Web wächst

- Netscape, IEE, Firefox ...
- Perl, PHP, JSP ...
- Apache, Tomcat, Ngnix ...

*und* ...

---
 
JavaScript ergänzt den Browser um Funktionalitäten

- DHTML
- AJAX
- jQuery
- backbone
- Angular
- React

---

JavaScript kommt auf den Sever

- node.js
- deno
- bun

---

mit Angular, React, vuejs (pls insert your js-framework of choice) kommen auch: 

- die Unterscheidung von Backend und Frontend
- die JSON-APIs (mehr oder weniger RESTful)
- build-Systeme (grunt,gulp,webpack,parcel...)
- transpiler

---

Hier ändert sich ein Paradigma.

Hypermedia beinhalten neben den Daten auch noch
'Hyper'-Informationen für Interaktivität.

JSON-Daten sind nur Daten. Erst die SPA-App, weiss
was damit gemacht wird.


---
*REST am Beispiel einer todo-Resource*

--- 

<table>

<tr>
<td>GET</td>
<td>/todos</td>
<td>Collection abrufen</td>
</tr>

<tr>
<td>GET</td>
<td>/todos?search=x</td>
<td>Collection filtern</td>
</tr>


<tr>
<td>GET</td>
<td>/todos/:id</td>
<td>Resource abrufen</td>
</tr>


<tr>
<td>POST</td>
<td>/todos [data]</td>
<td>Resource erzeugen</td>
</tr>

<tr>
<td>PUT</td>
<td>/todos/:id [data]</td>
<td>R. komplett ersetzen</td>
</tr>

<tr>
<td>PATCH</td>
<td>/todos/:id [data]</td>
<td>R. partiell ersetzen</td>
</tr>

<tr>
<td>DELETE</td>
<td>/todos/:id</td>
<td>Resource löschen</td>
</tr>
</table>


---

*die daten*
```js
const crypto = require("crypto");

let todoList = [
  { 
    id: crypto.randomUUID(),
    completed: false, 
    task: "read a book" 
  },
  { 
    id: crypto.randomUUID(), 
    completed: false, 
    task: "drink a beer" 
  },
];
```

---

*collection abrufen*

```curl
GET	/todos
```

--

*verarbeitung im server*

```js
app.get("/todos", function (req, res) {
  res.render("todo", { todoList: todoList });
});
```

--

*collection template: todo-list.ejs*

```html
<ul id="todo-list">
    <% todoList.forEach(item => { %>
        <%- include('todo-item.ejs', {item: item}) %>
    <% }) %>
</ul>
```
-- 

*item template: todo-item.ejs*

```html [1-28|2-9|10-15|17-20]
<li id="item-<%= item.id %>">
    <button hx-put="/todos/<%= item.id %>/toggle"
            hx-target="#item-<%= item.id %>">
        <% if (item.completed) { %>
            repeat
        <% } else { %>
            done
        <% } %>
    </button>
    <button hx-delete="/todos/<%= item.id %>"
            hx-target="#item-<%= item.id %>"
            hx-confirm="Really delete this item?"
            hx-swap="delete">
        delete
    </button>
    <span id="task-<%= item.id %>">
        <button hx-get="/todos/<%= item.id %>/edit"
                hx-target="#task-<%= item.id %>">
            edit
        </button>

        <% if (item.completed) { %>
            <strike><%= item.task %></strike>
        <% } else { %>
            <%= item.task %>
        <% } %>
    </span>
</li>
```

---



```curl
POST	/todos [data]
```

// Conecta una dirección del navegador con una página.
import { createFileRoute } from "@tanstack/react-router";

// Permite guardar información que puede cambiar y actualizar la pantalla.
import { useState } from "react";

// Al entrar a /todo, se muestra el componente RouteComponent.
export const Route = createFileRoute("/todo/")({
	component: RouteComponent,
});

// ARRAY: lista con los datos de las tareas.
// Cada objeto entre { } representa una tarea.
// Para este buscador solo necesitamos id y title.
const todoListItems = [
	{ id: 1, title: "Buy groceries" },
	{ id: 2, title: "Walk the dog" },
	{ id: 3, title: "Read a book" },
];

// COMPONENTE: función que prepara y devuelve lo que se verá en la página.
function RouteComponent() {
	// filteredItems = lista de tareas que mostramos.
	// setFilteredItems = función para cambiar esa lista.
	// Al comenzar, mostramos todas las tareas de todoListItems.
	const [filteredItems, setFilteredItems] = useState(todoListItems);

	// Esta función se ejecuta cuando cambia el texto del buscador.
	// searchTerm recibe el texto escrito.
	// ": string" indica que ese dato es texto.
	function searchHandler(searchTerm: string) {
		// filter crea una nueva lista con las tareas que coinciden.
		// item representa cada tarea que estamos revisando.
		// toLowerCase convierte ambos textos a minúsculas.
		// includes comprueba si el título contiene el texto buscado.
		const results = todoListItems.filter((item) =>
			item.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		// Actualiza la lista guardada en el estado.
		// React vuelve a ejecutar el componente y actualiza la pantalla.
		setFilteredItems(results);
	}

	// El return contiene JSX: describe lo que aparece en la página.
	return (
		<div>
			<h1>My tasks</h1>

			{/*
        input = casilla para escribir.
        placeholder = texto de ayuda cuando está vacía.
        onChange = ejecuta una función cuando cambia el texto.
        event.target.value = texto actual de la casilla.
        searchHandler recibe ese texto y hace la búsqueda.
      */}
			<input
				type="text"
				aria-label="Search for a task"
				placeholder="Search for a task"
				onChange={(event) => searchHandler(event.target.value)}
				className="m-2 border p-2"
			/>

			{/*
        Si la lista tiene cero elementos, mostramos "no matches".
        && significa que mostramos el mensaje si la condición es verdadera.
      */}
			{filteredItems.length === 0 && <p>no matches</p>}

			{/*
        map crea un div por cada tarea de la lista filtrada.
        key identifica cada tarea para React.
        item.title muestra su título.
        Si la lista está vacía, map no muestra ninguna tarea.
      */}
			{filteredItems.map((item) => (
				<div key={item.id} className="m-2 border p-4">
					{item.title}
				</div>
			))}
		</div>
	);
}

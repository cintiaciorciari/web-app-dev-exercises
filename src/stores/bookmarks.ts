import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Bookmark {
	id: string;
	title: string;
	url: string;
	isFavorite: boolean;
}

interface BookmarksStore {
	bookmarks: Bookmark[];
	add: (input: { title: string; url: string }) => void;
	toggleFavorite: (id: string) => void;
	remove: (id: string) => void;
}
// create crea el store de Zustand.
// immer permite trabajar con un borrador del estado:
// escribimos cambios sencillos e Immer produce el nuevo estado.
export const useBookmarksStore = create<BookmarksStore>()(
	immer((set) => ({
		// Lista vacía al comenzar.
		bookmarks: [],

		// Recibe un objeto con el título y la dirección del enlace.
		add: ({ title, url }) =>
			// set actualiza el store.
			// Gracias a Immer, state es un borrador que podemos modificar.
			set((state) => {
				// push agrega un elemento al final de la lista.
				state.bookmarks.push({
					id: crypto.randomUUID(), // Genera un identificador único.
					title: title, // Guarda el título recibido.
					url: url, // Guarda la dirección recibida.
					isFavorite: false, // Comienza sin marcar como favorito.
				});
			}),

		// Recibe el identificador del bookmark que queremos cambiar.
		toggleFavorite: (id) =>
			set((state) => {
				// find busca en la lista y devuelve el primer elemento que coincide.
				// b representa cada bookmark que revisamos.
				const bookmark = state.bookmarks.find((b) => b.id === id);

				// Si encontramos el bookmark, invertimos su valor de favorito.
				if (bookmark) {
					bookmark.isFavorite = !bookmark.isFavorite;
				}
			}),

		// Recibe el identificador del bookmark que queremos eliminar.
		remove: (id) =>
			set((state) => {
				// filter crea una lista con los bookmarks que queremos conservar.
				// !== significa "es diferente de".
				// Conservamos todos excepto el que tiene el id recibido.
				state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
			}),
	})),
);

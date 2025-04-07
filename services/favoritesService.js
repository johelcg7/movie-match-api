let favorites = []; // Lista en memoria para almacenar las películas favoritas

// Agregar una película a la lista de favoritos
export const addFavorite = (movie) => {
    const exists = favorites.some(fav => fav.id === movie.id);
    if (exists) {
        throw new Error("La película ya está en la lista de favoritos.");
    }
    favorites.push(movie);
    return movie;
};

// Obtener todas las películas favoritas
export const getFavorites = () => {
    return favorites;
};

// Eliminar una película de la lista de favoritos
export const removeFavorite = (idOrName) => {
    const index = favorites.findIndex(
        fav => fav.id.toLowerCase() === idOrName.toLowerCase() || fav.title.toLowerCase() === idOrName.toLowerCase()
    );

    if (index === -1) {
        throw new Error("La película no se encuentra en la lista de favoritos.");
    }

    const removedMovie = favorites.splice(index, 1)[0]; // Eliminar la película y devolverla
    return removedMovie;
};
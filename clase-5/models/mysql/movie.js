import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'cristiano_FS10',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      // no genre found
      if (genres.length === 0) return []

      // id from first genre found
      const { id: genreId } = genres[0]

      const [moviesByGenre] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie JOIN movie_genre ON movie.id = movie_genre.movie_id WHERE genre_id = ?;', [genreId]
      )

      return moviesByGenre
    } else {
      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
      )
      return movies
    }
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    if (movies.length === 0) return []
    return movies
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie 
          (id, title, year, duration, director, rate, poster) 
        VALUES 
          (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, duration, director, rate, poster]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)', [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    try {
      await connection.query(
        'DELETE FROM movie WHERE id = ?',
        [id]
      )
    } catch (e) {
      throw new Error('Error deleting movie')
    }
  }

  static async update ({ id, input }) {
    // try {
    //   await connection.query(
    //     `UPDATE movie
    //       SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
    //     WHERE id = ?;`,
    //     [id]
    //   )
    // } catch (e) {
    //   throw new Error('Error updating movie')
    // }
  }
}

export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  };

  async getAllBooks() {
    const books = await this.getResource(`/books/`);
    return books.map(this._transformBook);
  }

  async getBook(id) {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
  }

  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    console.log(res);
    return res.map((item) => this._transformCharacter(item));
  }

  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  async getAllHouses() {
    const houses = await this.getResource(`/houses/`);
    return houses.map(this._transformBook);
  }

  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(house);
  }

  isSet(data) {
    if (data) {
      return data;
    } else {
      return "No data";
    }
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacter(char) {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      publiser: book.publiser,
      released: book.released,
      numberOfPages: book.numberOfPages,
    };
  }
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
    };
  }
}

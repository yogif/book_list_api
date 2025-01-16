class BookModel {
  constructor({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished }){
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;
    this.insertedAt = insertedAt;
    this.updatedAt = updatedAt;
    this.finished = finished;
  }

  update({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished }){
    if (name) this.name = name;
    if (year) this.year = year;
    if (author) this.author = author;
    if (summary) this.summary = summary;
    if (publisher) this.publisher = publisher;
    if (pageCount) this.pageCount = pageCount;
    if (readPage) this.readPage = readPage;
    if (reading) this.reading = reading;
    if (insertedAt) this.insertedAt = insertedAt;
    if (updatedAt) this.updatedAt = updatedAt;
    if (finished) this.finished = finished;
  }
}

module.exports = BookModel;
const { nanoid } = require('nanoid');
const listBuku = require('./modelList');
const bookWrapper = require('./model');


const saveBuku = (input, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = input.payload;
  const idTmp = input.params;
  const val = validation(input, h);

  if (val){
    return h.response(val);
  }

  if (idTmp.id){
    const dataIndex = listBuku.findIndex((r) => r.id === idTmp.id);

    if (dataIndex !== -1){
      listBuku[dataIndex] = {
        ...listBuku[dataIndex],
        name : name,
        year : year,
        author : author,
        summary : summary,
        publisher : publisher,
        pageCount : pageCount,
        readPage : readPage,
        reading : reading,
        updatedAt : new Date().toISOString(),
        finished : pageCount === readPage ? true : false,
      };

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      });
      response.code(200);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;

  } else {
    const wrapper = new bookWrapper({
      id : nanoid(16),
      name : name,
      year : year,
      author : author,
      summary : summary,
      publisher : publisher,
      pageCount : pageCount,
      readPage : readPage,
      reading : reading,
      insertedAt : new Date().toISOString(),
      updatedAt : new Date().toISOString(),
      finished : pageCount === readPage ? true : false,
    });

    listBuku.push(wrapper);
    const isSukses = listBuku.filter((buku) => buku.id === wrapper.id).length > 0;

    if (isSukses) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: wrapper.id
        },
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

const getAll = (input, h) => {
  const listBukuAll = [];
  listBuku.forEach((r) => {
    const bukuTmp = new bookWrapper({
      id: r.id,
      name: r.name,
      publisher: r.publisher
    });

    listBukuAll.push(bukuTmp);
  });
  const response = h.response({
    status: 'success',
    data: {
      books: listBukuAll
    },
  });
  response.code(200);
  return response;
};

const getById = (input, h) => {
  const { id } = input.params;

  const buku = listBuku.find((r) => r.id === id);

  if (buku){
    const response = h.response({
      status: 'success',
      data: {
        book: buku
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
      // data: {},
    });
    response.code(404);
    return response;
  }
};

const deleteBuku = (input, h) => {
  const { id } = input.params;

  const index = listBuku.findIndex((r) => r.id === id);
  if (index !== -1){
    listBuku.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  });
  response.code(404);
  return response;

};

const validation = (input, h) => {
  const { name, pageCount, readPage } = input.payload;
  const idTmp = input.params;
  try {
    const pesan = idTmp.id ? 'Gagal memperbarui buku.' : 'Gagal menambahkan buku.';
    if (name == null) {
      const response = h.response({
        status: 'fail',
        message: `${pesan  } Mohon isi nama buku`,
        // data: {},
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: `${pesan  } readPage tidak boleh lebih besar dari pageCount`,
        // data: {},
      });
      response.code(400);
      return response;
    }
  } catch (e){
    const response = h.response({
      status: 'fail',
      message: e,
      // data: {},
    });
    response.code(404);
    return response;
  }
};

module.exports = { saveBuku, getAll, getById, deleteBuku };
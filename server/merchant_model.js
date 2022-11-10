const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM tasks ORDER BY tid ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, course, due_date, stage} = body;
      pool.query('INSERT INTO tasks (task_name, course, due_date, stage) VALUES ($1, $2, $3, $4) RETURNING *', [name, course, due_date, stage], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new task has been added: ${name}`)
      })
    })
  }
  const deleteMerchant = (id) => {
    return new Promise(function(resolve, reject) {
      // const id = parseInt(request.params.id)
      pool.query('DELETE FROM tasks WHERE tid = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Task deleted with ID: ${id}`)
      })
    })
  }

  const updateStage = (body) => {
    console.log(body);
    return new Promise(function(resolve, reject) {
      // const id = parseInt(request.params.id)
      const {id, stage} = body
      pool.query('UPDATE tasks SET stage = $2 WHERE tid = $1 ', [id, stage], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Task changed with ID: ${id}`)
      })
    })
  }

  const updateTask = (body) => {
    return new Promise(function(resolve, reject) {
      // const id = parseInt(request.params.id)
      const {id, column, change} = body
      console.log(column);

      pool.query(`UPDATE tasks SET $2 = $3 WHERE tid = $1 `, [id, column, change], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Task changed with ID: ${id}.`)
      })
    })


  }
  
  module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
    updateStage,
    updateTask
  }
// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'my_user',
//   host: 'localhost',
//   database: 'my_database',
//   password: 'root',
//   port: 5432,
// });

// const getMerchants = () => {
//     return new Promise(function(resolve, reject) {
//       pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(results.rows);
//       })
//     }) 
//   }
//   const createMerchant = (body) => {
//     return new Promise(function(resolve, reject) {
//       const { name, email } = body
//       pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(`A new merchant has been added added: ${name}`)
//       })
//     })
//   }
//   const deleteMerchant = (id) => {
//     return new Promise(function(resolve, reject) {
//       // const id = parseInt(request.params.id)
//       pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(`Merchant deleted with ID: ${id}`)
//       })
//     })
//   }
  
//   module.exports = {
//     getMerchants,
//     createMerchant,
//     deleteMerchant,
//   }
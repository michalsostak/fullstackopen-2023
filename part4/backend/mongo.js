const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  // `mongodb+srv://michalsostak:${password}@cluster0.f1vgnnl.mongodb.net/noteApp?retryWrites=true&w=majority`
  `mongodb+srv://michalsostak:${password}@cluster0.f1vgnnl.mongodb.net/testNoteApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)



// Post new notes

// const note1 = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// note1.save().then(() => {
//   console.log('note1 saved!')
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   // date: new Date(),
//   important: true,
// })

// note.save().then(() => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
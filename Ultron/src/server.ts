import app from "./app";

function main() {
   app.listen(5000, 'localhost', () => {
      console.log('Server started')
   })
}

main()
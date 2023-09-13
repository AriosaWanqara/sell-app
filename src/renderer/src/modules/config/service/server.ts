import cp from 'child_process'

function startServer() {
  console.log('algo')

  try {
    cp.exec(
      'java -jar C:\\Users\\Usuario\\Documents\\GitHub\\middelware\\target\\middelware-0.0.1-SNAPSHOT.jar 8080',
      (params) => {
        console.log(params)
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export default startServer

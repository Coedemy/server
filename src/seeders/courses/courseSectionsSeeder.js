const videoSources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
  trailer1: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
}

const courseSectionsSeeder = () => {
  return (
    [
      {
        learningObjective: "Understand Fundamental About Microservices",
        title: "Fundamental About Microservices",
        lectures: [
          {
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          }
        ],
      },
      {
        learningObjective: "Let build A Mini-MicroService App in this section",
        title: "A Mini-MicroService App",
        lectures: [
          {
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          }
        ],
      },
      {
        learningObjective: "Understand docker and Learn how to run multiple services with docker",
        title: "Run services with docker",
        lectures: [
          {
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyTrailer
            },
            resource: []
          }
        ],
      }
    ]
  )
}

module.exports = {
  courseSectionsSeeder
}
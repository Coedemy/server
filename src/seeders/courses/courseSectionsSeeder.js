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
        learningObjective: "Understand Fundamental About MicroServices",
        title: "Fundamental About MicroServices",
        lectures: [
          {
            title: "How to get help",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "Data in MicroServices",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.trailer1
            },
            resource: []
          },
          {
            title: "Big Problem in Data",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.sintelTrailer
            },
            resource: []
          },
          {
            title: "Event-Based Communication",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.trailer1
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
            title: "App Overview",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.trailer1
            },
            resource: []
          },
          {
            title: "Post Services Creation",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "Implement a Comment Service",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.trailer1
            },
            resource: []
          },
          {
            title: "React project setup",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.sintelTrailer
            },
            resource: []
          },
          {
            title: "Display Comment",
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
            title: "Deployment Issues",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "W;hy Docker?",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "Dockerizing the Posts Service",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "Dockerizing other Services",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          }
        ],
      },
      {
        learningObjective: "Learn how to Test MicroService app separably",
        title: "Testing isolated MicroServices",
        lectures: [
          {
            title: "Scope of Testing",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyTrailer
            },
            resource: []
          },
          {
            title: "Testing goal",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyTrailer
            },
            resource: []
          }
        ],
      },
      {
        learningObjective: "Utilize code in MicroServices app",
        title: "Code sharing and reuse between services",
        lectures: [
          {
            title: "Shared Logic Between Services",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "NPM Organizations",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
            },
            resource: []
          },
          {
            title: "Publish NPM Modules",
            content: {
              lectureContentType: "VIDEO",
              videoUrl: videoSources.bunnyMovie
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
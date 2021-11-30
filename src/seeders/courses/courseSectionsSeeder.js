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
            canPreview: true,
            title: "How to get help",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            canPreview: true,
            title: "Data in MicroServices",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.trailer1,
                alt: 'trailer1',
                duration: 734
              }
            },
            resource: []
          },
          {
            title: "Big Problem in Data",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.sintelTrailer,
                alt: 'sintelTrailer',
                duration: 52
              }
            },
            resource: []
          },
          {
            canPreview: true,
            title: "Event-Based Communication",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.trailer1,
                alt: 'trailer1',
                duration: 734
              }
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
            canPreview: true,
            title: "App Overview",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.trailer1,
                alt: 'trailer1',
                duration: 734
              }
            },
            resource: []
          },
          {
            title: "Post Services Creation",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "Implement a Comment Service",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.trailer1,
                alt: 'trailer1',
                duration: 734
              }
            },
            resource: []
          },
          {
            title: "React project setup",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.sintelTrailer,
                alt: 'sintelTrailer',
                duration: 52
              }
            },
            resource: []
          },
          {
            title: "Display Comment",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
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
            canPreview: true,
            title: "Deployment Issues",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "W;hy Docker?",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "Dockerizing the Posts Service",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "Dockerizing other Services",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
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
            canPreview: true,
            title: "Scope of Testing",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            canPreview: true,
            title: "Testing goal",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
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
            canPreview: true,
            title: "Shared Logic Between Services",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "NPM Organizations",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
            },
            resource: []
          },
          {
            title: "Publish NPM Modules",
            content: {
              lectureContentType: "VIDEO",
              video: {
                url: videoSources.bunnyMovie,
                alt: 'bunnyMovie',
                duration: 33
              }
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
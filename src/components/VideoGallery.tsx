import { galleryData } from '@/data/galleryData'

export function VideoGallery () {
  const videos = galleryData.filter(item => item.type === 'video')

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Videos
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Videos musicales y presentaciones en vivo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(video.url)}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-gray-300 text-sm">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

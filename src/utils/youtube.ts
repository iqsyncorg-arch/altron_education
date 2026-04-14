/**
 * Utility to handle YouTube URL parsing and conversion.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 */

export const getYoutubeId = (url: string): string => {
    if (!url) return '';

    // Handle watch?v= format
    if (url.includes('v=')) {
        const afterV = url.split('v=')[1];
        return afterV.split('&')[0];
    }

    // Handle shorts/ format
    if (url.includes('shorts/')) {
        const afterShorts = url.split('shorts/')[1];
        return afterShorts.split('?')[0];
    }

    // Handle youtu.be/ format
    if (url.includes('youtu.be/')) {
        const afterBe = url.split('youtu.be/')[1];
        return afterBe.split('?')[0];
    }

    return '';
};

export const getYoutubeEmbedUrl = (url: string): string => {
    const videoId = getYoutubeId(url);
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}`;
};

export const getYoutubeThumbnailUrl = (url: string): string => {
    const videoId = getYoutubeId(url);
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

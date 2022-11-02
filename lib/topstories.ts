import { HackerNewsItem, HackerNewsUser } from "../interfaces";
import { truncateTextToEllipsis} from "../utils/truncate-text"


const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const getSortedStoriesByScore =  async () => {

    const stories = await getStoriesData()

    return stories.sort((a, b) => {
        if(a.score < b.score) {
            return 1
        } else {
            return -1
        }
    })

}

export const getStoriesData = async () => {

    const ids = await getAllTopStoryIds();
    const tenRandomStoryIds = getRandomStories(ids, 10)

    const stories = await Promise.all(tenRandomStoryIds.map(async id => {
        const story = await getStoryById(id)
        if(story.text) {
            const text = truncateTextToEllipsis(story.text, 100);
            return {...story, text}

        }
        return story
    })) 

    return stories
}


export const getRandomStories =  (ids: number[], max: number): number[] => {
    
    let randomIds: number[] = [];
    for (let index = 0; index < max; index++) {
        const random = Math.floor(Math.random() * ids.length)
        const id = ids[random]
        if(!randomIds.includes(id)) {
            randomIds.push(ids[random])
        } else {
            index--
        }
        
    }
    return randomIds;
}


export const getAllTopStoryIds = async () : Promise<number[]> => {

    const topStoriesURL = `${baseURL}/topstories.json`
    const result = await fetch(topStoriesURL)
    return await result.json()
}

export const getStoryById = async(id: number) : Promise<HackerNewsItem> => {

    const storyURL = `${baseURL}/item/${id}.json`
    const result = await fetch(storyURL)
    return await result.json()
}

export const getUserById = async(id: string): Promise<HackerNewsUser> => {

    const userURL = `${baseURL}/user/${id}.json`
    const result = await fetch(userURL)
    return await result.json()

}
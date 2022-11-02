

export const truncateTextToEllipsis = (text: string|undefined, length: number = 10) => {
    if(text) {
        if(text.length > length) {
            const stripText = stripHTMLFromText(text);
            return stripText.slice(0, length) + "..."
        }
    }
    return text
}


export const stripHTMLFromText = (text: string) => {
   return text.replace(/<[^>]*>?/gm, '')
}
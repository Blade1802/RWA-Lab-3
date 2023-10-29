// Fetch the data from the JSONPlaceholder API
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
        // Problem 1: List all post titles with more than six words
        const longPostTitles = posts
            .map((post) => post.title)
            .filter((title) => title.split(" ").length > 6);
        console.log("Post titles with more than six words:");
        console.log(longPostTitles);

        // Problem 2: Show a word frequency map for all body contents of the posts
        // Join all post bodies into one string, split into words, and create a word frequency map
        const wordFrequencyMap = posts
            .map((post) => post.body)
            .join(" ")
            .split(/\s+/)
            .reduce((wordMap, word) => {
                wordMap[word] = (wordMap[word] || 0) + 1;
                return wordMap;
            }, {});
        console.log("Word frequency map for body contents:");
        console.log(wordFrequencyMap);
    })
    .catch((error) => console.error("Error fetching data:", error));
